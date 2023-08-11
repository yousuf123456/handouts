import { NextResponse } from "next/server";
import { getCurrentUser, getCurrentUserParameters } from "@/app/actions/getCurrentUser";
import prisma from "../../libs/prismadb";


export async function POST(req : Request){
    try{
        const { cartItemId, quantity } = await req.json();

        const parameters: getCurrentUserParameters = {
            updateCartItemCount : true,
            byValue : 0,
            query : { decrement : quantity }
        }
        const currentUser = await getCurrentUser(parameters);

        if (!currentUser || !currentUser.id) {
            return new NextResponse("Unauthorized User", { status : 401 })
        }


        const updatedCartItem = await prisma.cartItem.delete({
            where : {
                id : cartItemId
            },
            select : {
                id : true
            }
        });

        return NextResponse.json(updatedCartItem)
    }
    catch(e){
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}