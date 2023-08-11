import prisma from '../libs/prismadb'

export const getOrderById = async(orderId : string)=> {
    const order = await prisma.order.findUnique({
        where : {
            id : orderId
        },

        include : {
            packages : {
                include : {
                    orderedProducts : true
                }
            }
        }
    });

    if(!order) return null

    return order;
}