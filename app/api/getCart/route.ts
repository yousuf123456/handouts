import { Prisma, Product } from '@prisma/client';
import { getCurrentUser, getCurrentUserParameters } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "../../libs/prismadb"

type UserType = {
    cartItems: {
        id: string;
        quantity: number;
        selectedCombination: Prisma.JsonValue;
        userId: string;
        productId: string;
        product : Product
    }[];
    id: string;
    name: string | null;
    email: string | null;
} | null

export async function POST(req : Request) {
    try {
        const parameters: getCurrentUserParameters = {
            getCart : true
        }
        const currentUser = await getCurrentUser(parameters) as UserType;

        if(!currentUser?.id || !currentUser) {
            return new NextResponse("Unauthorized User", { status : 401 })
        }

        return NextResponse.json(currentUser);
    }

    catch(e) {
        console.log(e)
        return new NextResponse("Internal Server Error !", { status : 500 })
    }
}