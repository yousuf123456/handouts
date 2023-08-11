import prisma from "../libs/prismadb"

export const getProductById = async(productId : string | undefined) => {

    if (productId === undefined || productId === null) {
        return null
    }

    const product = await prisma.product.findUnique({
        where : {
            id : productId
        },

        include : {
            discount : true,
            ratingAndReviews : {
                take : 8
            },
            questions : {
                take : 8
            },

            store : {
                include : {
                    discounts : {
                        where : {
                            isApplicableForStore : true
                        }
                    }
                }
            }
        }
    });

    return product;
}