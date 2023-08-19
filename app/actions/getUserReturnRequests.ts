import { getOffsetPaginationQuery, getPaginationQuery } from './getUserOrders';
import prisma from "../libs/prismadb"
import { getCurrentUser } from "./getCurrentUser"
import { RETURNS_PER_PAGE } from '../constants/consts';

type Parameters = {
    byId? : string;
    page? : number | undefined;
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

    let query: any = {
        orderBy : {
            id : "desc"
        },

        where : {
            requesterId : currentUser.id
        },

        include : {
            orderedProducts : true
        },

        take : RETURNS_PER_PAGE
    }

    const {
        page,

    } = parameters

    const updatedQuery = getOffsetPaginationQuery({ query, page, ITEMS_PER_PAGE : RETURNS_PER_PAGE });

    const returnRequests = await prisma.$transaction([
        prisma.returnRequest.count({
            where : {
                requesterId : currentUser.id
            }
        }),

        prisma.returnRequest.findMany(updatedQuery)
    ]);

    const returnRequestsCount = returnRequests[0] || 0
    const returnRequestsData = returnRequests[1]

    return {
        data : returnRequestsData,
        count : returnRequestsCount
    }
}