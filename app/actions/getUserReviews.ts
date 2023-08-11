import prisma from "../libs/prismadb"
import { OrderedProductType } from "../types";
import { getCurrentUser } from "./getCurrentUser";

type Parameters = {
    toBeReviewedReviews? : boolean;
}

export const getUserReviews = async(paramters: Parameters = {})=> {

    const {
        toBeReviewedReviews

    } = paramters

    const currentUser = await getCurrentUser();
    if(!currentUser) return null;

    
    if(toBeReviewedReviews) {
        const ToBeReviewedReviews = await prisma.order.findMany({
            where : {
                OR : [
                    {
                        packages : {
                            some : {
                                status : "Delievered",
                                orderedProducts : {
                                    some : {
                                        hasBeenReviewed : false
                                    }
                                }
                            },
                        },
                    }
                ]
            },
    
            include : {
                packages : {
                    where : {
                        status : "Delievered"
                    },
    
                    include : {
                        orderedProducts : {
                            where : {
                                cancellationRequest : null
                            }
                        }
                    }
                }
            }
        });
        return ToBeReviewedReviews;
    }

    const ToBeReviewedReviews = await prisma.order.findMany({
        where : {
            OR : [
                {
                    packages : {
                        some : {
                            status : "Delievered"
                        },
                    },
                }
            ]
        },

        include : {
            packages : {
                where : {
                    status : "Delievered"
                },

                include : {
                    orderedProducts : {
                        where : {
                            cancellationRequest : null
                        }
                    }
                }
            }
        }
    });

    const delieveredProductInfo = ToBeReviewedReviews.map((toBeReviewedOrder)=> {
        return toBeReviewedOrder.packages.map((Package)=> {
            const orderedProducts = Package.orderedProducts as unknown as OrderedProductType[]
            return orderedProducts.map((orderedProduct)=> {
                return {
                    id : orderedProduct.product.id,
                    purchasedAt : toBeReviewedOrder.createdAt
                }
            })[0]
        })[0]
    })

    const delieveredProductIds = delieveredProductInfo.map((productInfo)=> productInfo.id)

    const HistoryReviews = await prisma.ratingAndReview.findMany({
        where : {
            userId : currentUser.id,
            productId : { in : delieveredProductIds }
        },

        include : {
            product : {
                select : {
                    id : true,
                    name : true,
                    image : true,
                    storeName : true
                }
            }
        }
    });

    const withPurchasedDateHistoryReviews = HistoryReviews.map((review)=> {
        const updatedHistoryReview = {
            ...review,
            product : {
                ...review.product,
                purchasedAt : delieveredProductInfo.filter((productInfo) => productInfo.id === review.product.id)[0].purchasedAt
            }
        }
        
        return updatedHistoryReview
    })

    return withPurchasedDateHistoryReviews
}