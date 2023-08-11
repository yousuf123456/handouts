import prisma from "../../libs/prismadb"


export const getStoreProducts = async(productId : string)=> {
    const product = await prisma.product.findUnique({
        where : {
            id : productId
        }
    });

    const productsFromSameStore = await prisma.product.findMany({
        where : {
            storeId : product?.storeId,
            NOT : { id : product?.id }
        },

        select : {
            id : true,
            name : true,
            price : true,
            image : true,
            discount : true,
            avgRating : true,
            ratingsCount : true,
        },

        take : 4
    });

    return productsFromSameStore
}