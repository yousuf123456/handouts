import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb"
import { getCurrentUser } from "@/app/actions/getCurrentUser";


export async function POST(req : Request) {
    try{
        const currentUser = await getCurrentUser();
        if(!currentUser || !currentUser.id){
            return new NextResponse('unauthorized User', { status : 401 })
        }

        const {productId} = await req.json();
    
        const pendingShippedProduct = await prisma.product.findUnique({
            where : {
                id : productId
            },
    
            select : {
                id: true,
                name: true,
                image: true,
                storeName : true,
                price: true,
                combinations : true,
                discount: true
            }
        });
    
        return NextResponse.json([pendingShippedProduct]);
    }
    catch(e){
        return new NextResponse("Internal Server Error",  { status : 500 })
    }
}