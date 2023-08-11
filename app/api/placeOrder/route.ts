import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function POST(req: Request){
    try{
        const {
            orderData,
            packagesData,
            storesAssociatedToOrder,
            fromCart

        } = await req.json();


        const currentUser = await getCurrentUser({ flushCart : fromCart });
        if(!currentUser || !currentUser.id){
            return new NextResponse("Unauthorized User", { status : 401 })
        }


        const createdOrder = await prisma.order.create({
            data : {
                shippingAddress : orderData.shippingAddress,
                billingAddress : orderData.billingAddress,
                totalQuantity : orderData.totalQuantity,
                totalAmmount : orderData.totalAmmount,
                emailTo : orderData.emailTo,
                customer : {
                    connect : {
                        id : currentUser.id
                    }
                },

                packages : {
                    create : packagesData
                },

                associatedStores : {
                    connect : storesAssociatedToOrder
                }
            }
        });

        if(!createdOrder){
            return new NextResponse("Something went wrong", { status : 500 })
        }

        return NextResponse.json(createdOrder);
    }
    catch(e){
        console.log(e)
        return new NextResponse("Internal Serer Error", { status : 500 })
    }
}