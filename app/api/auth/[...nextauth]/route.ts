import NextAuth, { AuthOptions, DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string | null | undefined;
      phone?: string | null | undefined;
      role?: "user" | "seller" | "admin";
      cartItemsCount?: number | null | undefined;
    } & DefaultSession["user"];
  }

  interface User {
    role: string | undefined | null;
  }
}

import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../libs/prismadb";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/user/sign",
  },
  providers: [
    FacebookProvider({
      profile(profile) {
        return {
          emailVerified: profile.emailVerified,
          phone: "",
          email: profile.email,
          image: profile.image,
          name: profile.name,
          role: "user",
        } as any;
      },
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    GoogleProvider({
      profile(profile) {
        return {
          emailVerified: profile.emailVerified,
          phone: "",
          email: profile.email,
          image: profile.image,
          name: profile.name,
          id: profile.sub,
          role: "user",
        } as any;
      },

      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { email_phone, password, name } = credentials as unknown as {
          email_phone: string;
          password: string;
          name: string;
        };

        const user = (await prisma.user.findFirst({
          where: {
            name: name,
          },
        })) as any;
        // if (!email_phone || !password) {
        //   throw new Error("Incomplete Credentials");
        // }

        // const user = await prisma.user.findFirst({
        //   where: {
        //     OR: [
        //       {
        //         email: email_phone,
        //       },
        //       {
        //         phone: email_phone,
        //       },
        //     ],
        //   },
        // });

        // if (!user || !user.hashedPassword) {
        //   throw new Error("Invalid Credentials");
        // }

        // const passwordIscorrect = await bcrypt.compare(
        //   password,
        //   user.hashedPassword,
        // );

        // if (!passwordIscorrect) {
        //   throw new Error("Invalid Credentials");
        // }

        return user;
      },
    }),
  ],

  callbacks: {
    async session({ session, token, user }) {
      const userDetails = await prisma.user.findFirst({
        where: {
          email: session.user?.email!,
        },

        select: {
          id: true,
          role: true,
          phone: true,
          cartItemsCount: true,
        },
      });

      if (session?.user !== undefined) {
        session.user.id = userDetails?.id;
        session.user.phone = userDetails?.phone;
        session.user.role = userDetails?.role as any;
        session.user.cartItemsCount = userDetails?.cartItemsCount;
      }

      token.role = userDetails?.role;

      return Promise.resolve(session);
    },
  },

  debug: process.env.NODE_ENV === "development",

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
