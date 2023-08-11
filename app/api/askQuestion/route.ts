
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

import prisma from "../../libs/prismadb"


export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser() as any;

        if (!currentUser || !currentUser.id) {
            return new NextResponse("Unauthorized User", { status : 401 })
        }

        const { productId, query } = await req.json();

        const product = await prisma.product.update({
            where : {
                id : productId
            },

            data : {
                questionsCount : {
                    increment : 1
                }
            },

            select : {
                id : true,
                questionsCount : true,
                store : {
                    select : {
                        id : true,
                        name : true,
                    }
                }
            }
        });

        if (product.questionsCount === 0) {
            await prisma.product.update({
                where : { id : product.id },
                data : { questionsCount : 1 }
            })
        }

        const newQuestion = await prisma.question.create({
            data : {
                query : query,
                userInformation : {
                    name : currentUser.name,
                    image : currentUser.image
                },
                storeInformation : {
                    name : product?.store.name
                },

                store : {
                    connect : {
                        id : product?.store.id
                    }
                },

                product : {
                    connect : {
                        id : product?.id
                    }
                },

                user : {
                    connect : {
                        id : currentUser.id
                    }
                }
            },
        });

        return NextResponse.json(newQuestion);
    }

    catch(e){
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}