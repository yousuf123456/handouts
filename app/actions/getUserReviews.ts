import prisma from "../libs/prismadb"

import { REVIEWS_PER_PAGE } from "../constants/consts";
import { HistoryReviewType, OrderedProductType } from "../types";
import { getCurrentUser } from "./getCurrentUser";
import { getOffsetPaginationQuery, getPaginationQuery } from "./getUserOrders";

type Parameters = {
    page? : number | undefined;
    toBeReviewedReviews? : boolean;
}

export const getUserReviews = async(paramters: Parameters = {})=> {

    const {
        page,
        toBeReviewedReviews

    } = paramters

    const currentUser = await getCurrentUser();
    if(!currentUser) return null;

    
    if(toBeReviewedReviews) {
        let query: any = {
            orderBy : {
                id : "desc"
            },

            where : {
                status : "Delievered",
                hasBeenReviewed : false,
                
                package : {
                    order : {
                        customerId : currentUser.id
                    }
                }
            },

            take : REVIEWS_PER_PAGE
        }

        const updatedQuery = getOffsetPaginationQuery({page, query: {...query}, ITEMS_PER_PAGE : REVIEWS_PER_PAGE});

        const ToBeReviewedReviews = await prisma.$transaction([
            prisma.orderedProduct.count({
                where : query.where
            }),

            prisma.orderedProduct.findMany(updatedQuery)
        ])

        const ToBeReviewedReviewsData = ToBeReviewedReviews[1] as OrderedProductType[];
        const ToBeReviewedReviewsCount = ToBeReviewedReviews[0] || 0;

        return {
            data : ToBeReviewedReviewsData,
            count : ToBeReviewedReviewsCount
        };
    }

    
    const hasBeenReviewedOrderedProducts = await prisma.orderedProduct.findMany({
        where : {
            status : "Delievered",

            package : {
                order : {
                    customerId : currentUser.id
                }
            }
        },
    }) as OrderedProductType[]; 
    
    const delieveredProductInfo = hasBeenReviewedOrderedProducts.map((orderedProduct)=> {
        return {
            id : orderedProduct.product.id,
            purchasedAt : orderedProduct.createdAt
        }
    })
    
    const delieveredProductIds = delieveredProductInfo.map((productInfo)=> productInfo.id);

    let query = {
        orderBy : {
            id : "desc"
        },

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
        },

        take : REVIEWS_PER_PAGE
    }

    const updatedQuery = getOffsetPaginationQuery({ query : {...query}, page, ITEMS_PER_PAGE : REVIEWS_PER_PAGE })
    
    const HistoryReviews = await prisma.$transaction([
        prisma.ratingAndReview.count({where : query.where}),
        prisma.ratingAndReview.findMany(updatedQuery)
    ])

    const HistoryReviewsData = HistoryReviews[1] as HistoryReviewType[]
    const HistoryReviewsCount = HistoryReviews[0]

    const withPurchasedDateHistoryReviews = HistoryReviewsData.map((review)=> {
        const updatedHistoryReview = {
            ...review,
            product : {
                ...review.product,
                purchasedAt : delieveredProductInfo.filter((productInfo) => productInfo.id === review.product.id)[0].purchasedAt
            }
        } 
        
        return updatedHistoryReview
    })

    return {
        data : withPurchasedDateHistoryReviews,
        count : HistoryReviewsCount
    }
}