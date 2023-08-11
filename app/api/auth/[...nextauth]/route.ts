import NextAuth, { AuthOptions, DefaultSession } from "next-auth"
declare module 'next-auth' {
  interface Session {
    user?: { 
      phone?: string | null | undefined;
      id? : string | null | undefined;
      cartItemsCount? : number | null | undefined
    } & DefaultSession["user"];
  }
}

import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../libs/prismadb"

import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter"


export const authOptions : AuthOptions = {
  // Configure one or more authentication providers
  adapter : PrismaAdapter(prisma),
  pages : {
    signIn : "/user/sign"
  },
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
        name: "Credentials",

        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
          password: { label: "Password", type: "password" }
        },

        async authorize(credentials, req) {
          const { email_phone, password } = credentials as unknown as { email_phone: string, password: string }

          if (!email_phone || !password) {
            throw new Error("Incomplete Credentials")
          }

          const user = await prisma.user.findFirst({
            where : {
                OR : 
                [
                  {
                    email : email_phone
                  },
                  {
                    phone : email_phone
                  }
                ]
            }
          });

          if (!user || !user.hashedPassword) {
            throw new Error("Invalid Credentials");
          }

          const passwordIscorrect = await bcrypt.compare(password, user.hashedPassword);

          if (!passwordIscorrect) {
            throw new Error("Invalid Credentials");
          }

          return user;
        }
      })
  ],

  callbacks : {
    async session({ session, token, user }) {

      const userDetails = await prisma.user.findUnique({
        where : {
          email : session.user?.email! 
        },

        select : {
          id : true,
          phone : true,
          cartItemsCount : true
        }
      });

      if (session?.user !== undefined){
        session.user.id = userDetails?.id
        session.user.cartItemsCount = userDetails?.cartItemsCount
        session.user.phone = userDetails?.phone
      }
      
      return Promise.resolve(session)
  },
  },

  debug : process.env.NODE_ENV === "development",

  session : {
    strategy : "jwt"
  },

  secret : process.env.NEXTAUTH_SECRET,
}

const handler =  NextAuth(authOptions);

export { handler as GET, handler as POST }