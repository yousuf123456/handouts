import React from 'react'
import prisma from "../../../../libs/prismadb"

import { ReviewsGauge } from '../../components/ReviewsGauge';
import { BreadCrumbs } from '@/app/user/orders/components/BreadCrumbs';
import { getProductReviewsById } from '@/app/actions/getProductDetailsById/getProductReviewsById';
import { RatingAndReview } from '@prisma/client';
import { RatingAndReviewCard } from '../../components/RatingAndReviewCard';
import { PaginationControl } from '@/app/user/components/PaginationControl';
import { PRODUCTS_REVIEWS_PER_PAGE } from '@/app/constants/consts';
import { Heading } from '@/app/(site)/components/Heading';
import { Seperator } from '@/app/components/Seperator';
import { SortAndFilters } from './SortAndFilters';
import { NoQuestions_ReviewsMessage } from '../../components/mini/NoQuestions_ReviewsMessage';

interface ReviewsProps {
    productId : string;
    filter : string | undefined;
    cursor : string | undefined;
    sortBy : "rating" | undefined;
    prevPage : number | undefined;
    pageNumber : number | undefined;
    tieBreaker : string | undefined;
    direction : "desc" | "asc" | undefined;
}

async function getProductReviewInfo(productId : string) {
    const productReviewInfo = await prisma.product.findUnique({
        where : {
            id : productId
        },

        select : {
            name : true,
            avgRating : true,
            ratingsCount : true,
            detailedRatingsCount : true
        }
    }) as {
        name  : string;
        avgRating : number;
        ratingsCount : number;
        detailedRatingsCount : any;
    }

    return productReviewInfo
}

export const Reviews: React.FC<ReviewsProps> = async({
    pageNumber,
    tieBreaker,
    productId,
    direction,
    prevPage,
    filter,
    sortBy,
    cursor
}) => {

    const productReviewInfo = await getProductReviewInfo(productId);
    const productReviews = await getProductReviewsById(
        { productId, page : pageNumber, prevPage, cursor, sortBy, direction, tieBreaker, filter }
    ) as unknown as RatingAndReview[];

    const lastReview = productReviews[productReviews.length - 1]
    const firstReview = productReviews[0]

    const crumbs = [
        {
            label : "Home",
            href : "/"
        },
        {
            label : productReviewInfo.name,
            href : `/products/${productId}`
        },
        {
            label : "customer-reviews",
            href : ``
        }
    ]


  return (
    <div className='flex flex-col gap-6'>
        <BreadCrumbs
           crumbs={crumbs} 
        />

        <div className='mt-3 flex flex-col gap-3'>
            <Heading>
                Product Reviews For { productReviewInfo.name }
            </Heading>

            <Seperator />

            <div className='my-4 flex justify-start'>
                <ReviewsGauge
                    avgRating={productReviewInfo.avgRating}
                    ratingsCount={productReviewInfo.ratingsCount}
                    detailedRatingsCount={productReviewInfo.detailedRatingsCount}
                />
            </div>

            <Seperator />

            <SortAndFilters 
                goingBack={(prevPage || 1) > (pageNumber || 1)}
                firstReview={firstReview}
                lastReview={lastReview}
            />

            <Seperator />

            {
                productReviews.length !== 0 ? (
                <div className='mt-4 flex flex-col gap-8'>
                    {
                        productReviews.map((productReview, i)=> (
                            <RatingAndReviewCard
                                key={i}
                                ratingAndReview={productReview}
                            />
                        ))
                    }
                </div>
                ):(
                    <NoQuestions_ReviewsMessage>
                        No Reviews Yet On This Product
                    </NoQuestions_ReviewsMessage>
                )
            }
            
            {
                productReviews.length !== 0 &&
                <div className='flex justify-start'>
                    <div className='w-fit'>
                        <PaginationControl
                            jumpingDisabled={true}
                            lastItemTieBreaker={lastReview.id}
                            firstItemTieBreaker={firstReview.id}
                            count={productReviewInfo.ratingsCount}
                            ITEMS_PER_PAGE={PRODUCTS_REVIEWS_PER_PAGE}
                            lastCursor={sortBy === "rating" ? lastReview.rating as number : lastReview.id}
                            firstCursor={sortBy === "rating" ? firstReview.rating as number : firstReview.id}
                        />
                    </div>
                </div>
            }
        </div>
    </div>
  )
}
