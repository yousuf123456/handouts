import { NextResponse } from "next/server";
import { getCurrentUser, getCurrentUserParameters } from "@/app/actions/getCurrentUser";
import prisma from "../../libs/prismadb";



export async function POST(req : Request){
    try{
        const { cartItemId, quantity, didDecrement } = await req.json();
        const query = didDecrement ? { decrement : 1 } : { increment : 1 };

        const parameters: getCurrentUserParameters = {
            updateCartItemCount : true,
            byValue : 0,
            query : query
        }
        const currentUser = await getCurrentUser(parameters);

        if (!currentUser || !currentUser.id) {
            return new NextResponse("Unauthorized User", { status : 401 })
        }

        const updatedCartItem = await prisma.cartItem.update({
            where : {
                id : cartItemId
            },

            data : {
                quantity : quantity
            },

            select : {
                id : true,
                quantity : true
            }
        });

        return NextResponse.json(updatedCartItem)
    }
    catch(e){
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}