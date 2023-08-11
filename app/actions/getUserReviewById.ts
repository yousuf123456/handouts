import { OrderedProduct } from '@prisma/client';
import { PipelineStage } from "mongoose";
import prisma from "../libs/prismadb"

export const getUserReviewById = async(reviewId : string | undefined)=> {

    const productReview = await prisma.ratingAndReview.findUnique({
        where : {
            id : reviewId
        }
    });

    const pipeline: any = [
        {
            $match : {
                'product.id' : productReview?.productId
            }
        }
    ]

    const orderedProducts = await prisma.orderedProduct.aggregateRaw({
        pipeline : pipeline
    }) as any;

    // const orderedProduct = orderedProducts.map((orderedProduct: any)=> (
    //     {
    //         ...orderedProduct,
    //         id : orderedProduct.id.$oid,
    //         packageId : orderedProduct.packageId.$oid
    //     }
    // ))[0]

    return {
        productReview,
        orderedProduct : orderedProducts[0]
    }
}