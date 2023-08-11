
import prisma from "../../libs/prismadb"

export const getProductReviewsById = async(productId : string) => {

    if (productId === undefined || productId === "undefined" || productId === null) {
        return null
    }

    const productReviews = await prisma.ratingAndReview.findMany({
        where : {
            productId : productId
        },

        take : 8
    });

    return productReviews;
}