import { getCurrentUser } from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "../../libs/prismadb"

export async function POST(req : Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.id) {
            return new NextResponse("Unauthorized User", { status : 401 })
        }

        const { favouriteItemId } = await req.json();

        const deletedFavouriteItem = await prisma.user.update({
            where : {
                id : currentUser.id
            },

            data : {
                favouriteItems : {
                    disconnect : {
                        id : favouriteItemId
                    }
                }
            },

            select : {
                id : true
            }
        });

        return NextResponse.json(deletedFavouriteItem, { status : 200 })
    }
    catch(e){
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}