
import { PRODUCTS_QUESTIONS_PER_PAGE } from "@/app/constants/consts";
import prisma from "../../libs/prismadb"
import { getPaginationPipeline } from "./getProductReviewsById";

interface Params {
    productId : string;
    page? : number | undefined;
    cursor? : string | undefined;
    prevPage? : number | undefined;
}

export const getProductQuestionsById = async(params : Params) => {

    const {
        productId,
        prevPage,
        cursor,
        page

    } = params

    if (productId === undefined || productId === "undefined" || productId === null) {
        return null
    }

    let pipeline = [
        {
            $match : {
               productId : {$oid : productId} 
            }
        },

        {
            $addFields : {
                id : { $toString : "$_id" },
                createdAt : { $toString : "$createdAt" }
            }
        },

        {
            $limit : PRODUCTS_QUESTIONS_PER_PAGE
        }
    ]

    const paginationPipeline = getPaginationPipeline({pipeline, page, prevPage, cursor})

    const productQuestions = await prisma.question.aggregateRaw({
        pipeline : paginationPipeline
    });

    return productQuestions;
}