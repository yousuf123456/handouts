import prisma from "../libs/prismadb"

export const getCheckoutOrder = async(checkoutOrderId: string) => {
    if(!checkoutOrderId) return null;

    const order = await prisma.order.findUnique({
        where : {
            id : checkoutOrderId
        }
    });

    return order
}