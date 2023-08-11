import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb"
import { getCurrentUser, getCurrentUserParameters } from "@/app/actions/getCurrentUser";
import { CartItemType } from "@/app/types";


export async function POST(req : Request) {
    try{
        const {
            selectedCombination,
            quantity,
            productId
        } 
        = await req.json();

        const parameters : getCurrentUserParameters = {
            updateCartItemCount : true,
            byValue : quantity,
            query : { increment : quantity }
        }
        const currentUser = await getCurrentUser(parameters);

        if (!currentUser || !currentUser.id) {
            return new NextResponse("Unauthorized User", { status : 401 })
        }

        if (!productId) {
            return new NextResponse("Invalid Data", { status : 400 })
        }

        const cart = await prisma.user.findUnique({
            where : {
                id : currentUser.id
            },

            include : {
                cartItems : {
                    select : {
                        id : true,
                        productId : true
                    }
                },
            }
        });

        const alreadyExistingCartItem = cart?.cartItems.filter((cartItem) => productId === cartItem.productId);
        const itemIsInTheCart = alreadyExistingCartItem && alreadyExistingCartItem.length > 0

        if (itemIsInTheCart) {
            const updatedCartItem = await prisma.cartItem.update({
                where : {
                    id : alreadyExistingCartItem[0].id
                },
                data :{
                    selectedCombination : selectedCombination,
                    quantity : {
                        increment : quantity
                    }
                },

                include : {
                    product : {
                        select : {
                            id : true,
                            name : true,
                            image : true,
                            price : true,
                            storeName : true,
                            discount : true,
                        }
                    }
                }
            })

            return NextResponse.json(updatedCartItem)
        };

        const createdCartItem : CartItemType  = await prisma.cartItem.create({
            data : {
                quantity : quantity,
                selectedCombination : selectedCombination,
                userId : currentUser.id,
                productId : productId
            },

            include : {
                product : {
                    select : {
                        id : true,
                        name : true,
                        storeName : true,
                        storeId: true,
                        image : true,
                        price : true,
                        discount : true,
                    }
                }
            }
        });

        return NextResponse.json(createdCartItem);
    }
    catch(e){
        console.log(e)
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}