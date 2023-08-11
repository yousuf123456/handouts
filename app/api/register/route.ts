import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

import prisma from "../../libs/prismadb"

type dataType = {
    email : string;
    password : string;
    name : string;
    image : string;
}

export async function POST(req: Request) {
    try{
        const { email, password, name, image } : dataType = await req.json();

        if (!email || !password || !name) {
            return new NextResponse("Incomplete Credentials!", { status : 401 })
        }

        const existingUser = await prisma.user.findMany({
            where : {
                email : email
            }
        });

        if (existingUser.length){
            return new NextResponse("Email Alreday Taken !", { status : 401 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newlyCreatedUser = await prisma.user.create({
            data : {
                email,
                hashedPassword,
                name,
                ...(image ? {image : image} : {})
            }
        });

        return NextResponse.json(newlyCreatedUser)
    }

    catch(e) {
        return new NextResponse("Internal Server Error !", { status : 500 })
    }
}