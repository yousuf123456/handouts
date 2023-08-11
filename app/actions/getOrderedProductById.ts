import prisma from "../libs/prismadb"

export const getOrderedProductById = async(id: string | undefined)=> {
    const orderedProduct = await prisma.orderedProduct.findUnique({
        where : {
            id : id
        }
    });

    return orderedProduct
}