import prisma from "../libs/prismadb"
import { OrderType } from "../types";
import { getCurrentUser } from "./getCurrentUser"

interface Parameters {
    page? : number | undefined;
    cursor? : string | undefined;
    prevPage? : number | undefined;
}

export const getUserOrders = async (parameters: Parameters = {})=> {
    const currentUser = await getCurrentUser();
    if(!currentUser || !currentUser.id) return {
        orders : null,
        count : 0
    };

    const {
        page,
        cursor,
        prevPage

    } = parameters

    const perPageOrdersCount = 2

    let query : any = {
        orderBy : {
            id : "desc"
        },

        where : {
            customerId : currentUser.id
        },

        include : {
            packages : {
                include : {
                    orderedProducts : true
                }
            }
        },

        take : perPageOrdersCount
    }

    const goingToSomePage = page !== undefined && prevPage !== undefined;

    const goingBack = goingToSomePage && page < prevPage;
    const goingNext = goingToSomePage && page > prevPage;
 
    const jumpingToSomePage = goingToSomePage && ((page - prevPage) > 1 || (page - prevPage) < -1);

    if(goingToSomePage && goingBack && !jumpingToSomePage) query.orderBy = {
        id : "asc"
    }

    if(goingToSomePage && !jumpingToSomePage) query.where = {
        ...query.where,
        id : {
            ...(goingNext ? {lt : cursor} : { gt : cursor})
        }
    }

    if(goingToSomePage && jumpingToSomePage) query.skip = (page - 1) * perPageOrdersCount
    

    const userOrders = await prisma.$transaction([
        prisma.order.count({ where : { customerId : currentUser.id } }),
        prisma.order.findMany(query),
    ]);

    const userOrdersCount = userOrders[0] ?? 0
    const userOrdersData = userOrders[1] as OrderType[]

    const dataSortedByIdDesc = goingBack ? userOrdersData.sort((a, b) => b.id.localeCompare(a.id)) : userOrdersData;

    return {
        count : userOrdersCount,
        orders : dataSortedByIdDesc
    };
}