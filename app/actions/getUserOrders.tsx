import prisma from "../libs/prismadb"
import { getCurrentUser } from "./getCurrentUser"

type GetUserOrders = {
    cancellations? : boolean,
    returns? : boolean 
}

export const getUserOrders = async ()=> {
    const currentUser = await getCurrentUser();

    if(!currentUser || !currentUser.id) return null

    const userOrders = await prisma.order.findMany({
        where : {
            customerId : currentUser.id
        },

        include : {
            packages : {
                include : {
                    orderedProducts : true
                }
            }
        }
    });

    return userOrders;
}