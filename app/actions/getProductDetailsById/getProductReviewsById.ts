
import page from "@/app/products/[productId]/page";
import prisma from "../../libs/prismadb"
import { PRODUCTS_REVIEWS_PER_PAGE } from "@/app/constants/consts";

interface getPaginationPipelineParams {
    pipeline : any;
    page : number | undefined;
    cursor : string | undefined;
    sortBy? : "rating" | undefined;
    prevPage : number | undefined;
    tieBreaker? : string | undefined;
    direction? : "desc" | "asc" | undefined;
}

export function getPaginationPipeline(params: getPaginationPipelineParams){
    const {
        page,
        sortBy,
        cursor,
        prevPage,
        direction,
        pipeline,
        tieBreaker,

    } = params

    const goingSomewhere = (page && prevPage);
    const goingBackwards = goingSomewhere && (page < prevPage);

    // If no sorting by rating than sorted by _id otherwise rating and _id

    const sortStage: any = {
        $sort : {}
    }

    if(sortBy !== "rating") sortStage.$sort._id = goingBackwards ? 1 : -1
    else {
        let sortingDirection = direction === "desc" ? -1 : 1
        if(goingBackwards) sortingDirection = sortingDirection * -1

        sortStage.$sort.rating = sortingDirection
        sortStage.$sort._id = sortingDirection * -1
    }

    // If no sorting by rating than id lt than cursor otherwise the or operator with sort gt || lt the cursor 
    const previousMatchStage = {...pipeline[0].$match}
    const $matchStage: any = {
        $match : previousMatchStage
    }

    const comparisonOperator1 = goingBackwards ? "$gt" : "$lt"

    if(sortBy !== "rating") $matchStage.$match._id = { [comparisonOperator1] : { $oid : cursor}}
    else {
        let comparisonOperator2 = direction === "desc" ? "$lt" : "$gt"
        if(goingBackwards) comparisonOperator2 = comparisonOperator2 === "$gt" ? "$lt" : "$gt"

        const orStage = [
            { rating: { [comparisonOperator2] : parseInt(cursor!) } },
            {
                rating: parseInt(cursor!),
                _id: { [comparisonOperator2 === "$lt" ? "$gt" : "$lt"]: { $oid : tieBreaker}}
            }
        ]
        $matchStage.$match.$or = orStage 
    }

    const anotherSortStage: any = {
        $sort : {}
    }

    if(goingBackwards) {
        if(sortBy !== "rating") anotherSortStage.$sort._id = -1
        else anotherSortStage.$sort.rating = direction === "desc" ? -1 : 1
    }

    let paginationPipeline = pipeline

    paginationPipeline = [
        { ...sortStage },
        ...paginationPipeline
    ]

    if(goingSomewhere) paginationPipeline[1] = $matchStage;

    if(goingBackwards) paginationPipeline = [
        ...paginationPipeline,
        { ...anotherSortStage }
    ]

    return paginationPipeline
}

interface Parameters {
    productId? : string;
    page? : number | undefined;
    filter? : string | undefined;
    cursor? : string | undefined;
    sortBy? : "rating" | undefined;
    prevPage? : number | undefined;
    tieBreaker? : string | undefined;
    direction? : "desc" | "asc" | undefined;
}

export const getProductReviewsById = async(parameters : Parameters = {}) => {
    const {
        tieBreaker,
        productId,
        direction,
        prevPage,
        sortBy,
        filter,
        cursor,
        page,

    } = parameters

    if (productId === undefined || productId === "undefined" || productId === null) {
        return null
    }


    let query: any = {
        orderBy : {
            id : "desc"
        },

        where : {
            productId : productId
        },

        take : PRODUCTS_REVIEWS_PER_PAGE
    }

    let pipeline: any = [
        {
            $match : {
                productId : {$oid : productId},
                ...(filter ? { rating : parseInt(filter) } :{})
            }
        },

        {
            $addFields : {
                createdAt : { $toString : "$createdAt" },
                productId : { $toString : "$productId" },
                id : { $toString : "$_id" },
            }
        },

        {
            $limit : PRODUCTS_REVIEWS_PER_PAGE 
        }
    ]

    const paginationPipeline = getPaginationPipeline({page, prevPage, cursor, sortBy, direction, pipeline: [...pipeline], tieBreaker});
    console.log(paginationPipeline)
    const productReviews = await prisma.ratingAndReview.aggregateRaw({
        pipeline : paginationPipeline
    });

    return productReviews;
}