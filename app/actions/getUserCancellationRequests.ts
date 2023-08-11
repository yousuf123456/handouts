import prisma from "../libs/prismadb"
import { getCurrentUser } from "./getCurrentUser"

type Parameters = {
    byId? : boolean;
    cancellationRequestId? : string;
}

export const getUserCancellationRequests = async(parameters : Parameters = {})=> {
    const currentUser = await getCurrentUser();
    if(!currentUser || !currentUser.id) return null

    const {
        cancellationRequestId,
        byId,
    } = parameters

    if(byId){
        const cancellationRequest = await prisma.cancellationRequest.findUnique({
            where : {
                id : cancellationRequestId
            },

            include : {
                orderedProducts : true
            }
        });

        return cancellationRequest
    }

    const cancellationRequests = await prisma.cancellationRequest.findMany({
        where : {
            requesterId : currentUser.id
        },

        include : {
            orderedProducts : true
        }
    });

    return cancellationRequests
}