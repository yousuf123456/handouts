import prisma from "../../libs/prismadb"
import { cache } from "react"

export const getProductInfoById = cache(async(productId : string) => {
    if (productId === undefined || productId === "undefined" || productId === null) {
        return null
    }

    const productInfo = await prisma.product.findUnique({
        where : {
            id : productId
        },

        include : {
            discount : true,
            store : {
                select : {
                    logo : true,
                    name : true,
                    createdAt : true,
                    posRatings : true,
                    neuRatings : true,
                    negRatings : true,
                    ratingsCount : true
                }
            }
        }
    });

    return productInfo;
})