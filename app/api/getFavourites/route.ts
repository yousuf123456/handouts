import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "../../libs/prismadb"

export async function POST(req : Request){
    try{
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.id) {
            return new NextResponse("Unauthorized User", { status : 401 })
        }

        const favouriteItems = await prisma.user.findUnique({
            where : {
                id : currentUser.id
            },

            select : {
                favouriteItems : {
                    select : {
                        id : true,
                        name : true,
                        image : true,
                        price : true,
                        discount : true,
                        store : {
                            include : {
                                discounts : {
                                    where : {
                                        isApplicableForStore : true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(favouriteItems, { status : 200 })
    }
    catch(e){
        console.log(e)
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}