import prisma from "../libs/prismadb"
import { getCurrentUser } from "./getCurrentUser"

type Parameters = {
    byId? : string;
}

export const getUserReturnRequests = async(parameters : Parameters = {})=> {
    const currentUser = await getCurrentUser();
    if(!currentUser || !currentUser.id) return null;

    if(parameters.byId){
        const returnRequestById = await prisma.returnRequest.findUnique({
            where : {
                id : parameters.byId
            },

            include : {
                orderedProducts : true
            }
        })

        return returnRequestById
    }

    const returnRequests = await prisma.returnRequest.findMany({
        where : {
            requesterId : currentUser.id
        },

        include : {
            orderedProducts : true
        }
    });

    return returnRequests
}