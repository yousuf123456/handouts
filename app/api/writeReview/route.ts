
import prisma from "../../libs/prismadb"

import { NextResponse } from "next/server"
import { getCurrentUser } from "@/app/actions/getCurrentUser"

export async function POST(req : Request){
    try{
        const currentUser = await getCurrentUser() as any;
        if(!currentUser || !currentUser.id) {
            return new NextResponse("Unauthorized User", { status : 401 })
        }

        const {
            storeId,
            reviewId,
            productId,
            isHistory,
            ratingData,
            orderedProductId,
            ratingToIncrease,
            previousProductRating,
            storeResponseIncrementData,

        } = await req.json();

        if(!isHistory){
            await prisma.orderedProduct.update({
                where : {
                    id : orderedProductId
                },
    
                data : {
                    hasBeenReviewed : true
                }
            })
        }

        await prisma.store.update({
            where : {
                id : storeId
            },

            data : {
                ratingsCount : { increment : !isHistory ? 1 : 0 },
                posRatings : { increment : storeResponseIncrementData.posRatings },
                neuRatings : { increment : storeResponseIncrementData.neuRatings },
                negRatings : { increment : storeResponseIncrementData.negRatings }
            }
        })

        const product = await prisma.product.findUnique({
            where : {
                id : productId
            },

            select : {
                detailedRatingsCount : true,
                ratingsCount : true,
                ratingsSum : true,
            }
        });
        
        const newRatingsSum = product?.ratingsSum + ratingToIncrease
        const newRatingsCount = isHistory ? product?.ratingsCount! : product?.ratingsCount! + 1
        const newAvgRating = newRatingsSum / newRatingsCount
        const newDetailedRatingsCount = product?.detailedRatingsCount as {
            [key: string] : number
        }

        newDetailedRatingsCount[ratingData.rating.toString()] = newDetailedRatingsCount[ratingData.rating.toString()] + 1
        if(isHistory){
            newDetailedRatingsCount[previousProductRating] = newDetailedRatingsCount[previousProductRating] - 1
        }
        
        await prisma.product.update({
            where : {
                id : productId
            },

            data : {
                avgRating : newAvgRating,
                ratingsSum : newRatingsSum,
                ratingsCount : newRatingsCount,
                detailedRatingsCount : newDetailedRatingsCount
            }
        });

        if(isHistory){
            const updatedReview = await prisma.ratingAndReview.update({
                where : {
                    id : reviewId
                },

                data : {
                    ...ratingData
                }
            });

            return NextResponse.json("Updated the review successfully")
        }

        const createdReview = await prisma.ratingAndReview.create({
            data : {
                ...ratingData,
                userInformation : {
                    name : currentUser.name,
                    image : currentUser.image
                },

                user : {
                    connect : {
                        id : currentUser.id
                    }
                },

                store : {
                    connect : {
                        id : storeId
                    }
                },

                product : {
                    connect : {
                        id : productId
                    }
                }
            }
        });

        return NextResponse.json("Created A Review Successfully");
    }
    catch(e){
        console.log(e)
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}