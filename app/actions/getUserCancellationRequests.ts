import { getOffsetPaginationQuery, getPaginationQuery } from './getUserOrders';
import { CANCELLATIONS_PER_PAGE } from "../constants/consts";
import prisma from "../libs/prismadb"
import { getCurrentUser } from "./getCurrentUser"
import { CancellationRequestType } from '../types';

type Parameters = {
    byId? : boolean;
    cancellationRequestId? : string;
    page? : number | undefined;
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

    const {
        page,

    } = parameters

    let query : any = {
        orderBy : {
            id : "desc"
        },

        where : {
            requesterId : currentUser.id
        },

        include : {
            orderedProducts : true
        },

        take : CANCELLATIONS_PER_PAGE
    }

    const updatedQuery = getOffsetPaginationQuery({page, query, ITEMS_PER_PAGE : CANCELLATIONS_PER_PAGE})

    const cancellationRequests = await prisma.$transaction([
        prisma.cancellationRequest.count({
            where : {
                requesterId : currentUser.id
            }
        }),

        prisma.cancellationRequest.findMany(updatedQuery)
    ])

    const cancellationRequestsData = cancellationRequests[1] as CancellationRequestType[];
    const cancellationRequestsCount = cancellationRequests[0] || 0;

    return {
        data : cancellationRequestsData,
        count : cancellationRequestsCount
    }
}