"use client";
import React from 'react'

import { Heading } from '@/app/(site)/components/Heading'
import { RatingAndReview } from '@prisma/client'
import { RatingAndReviewCard } from './RatingAndReviewCard';
import { CtaLink } from '@/app/(site)/components/CtaLink';
import { NoQuestions_ReviewsMessage } from './mini/NoQuestions_ReviewsMessage';
import { useAppSelector } from '@/app/store/store';
import { ReviewsGauge } from './ReviewsGauge';

interface ProductReviewsProps {
    ratingAndReviews : RatingAndReview[] | null
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ 
    ratingAndReviews,
 }) => {

    const avgRating = useAppSelector(state=>state.productMinorInfo.avgRating);
    const ratingsCount = useAppSelector(state=>state.productMinorInfo.ratingsCount);
    const detailedRatingsCount = useAppSelector(state=> state.productMinorInfo.detailedRatingsCount);

    const fakeRatingsAndReviews = [
        {
            rating : 3.5,
            review : "The product was just Ok not super good!",
            createdAt : new Date(),
            answer : "We will try to meet your expectations next time..Cheers",
            answeredAt : new Date(),
            reviewImages : ["/images/exclusiveSection/handmade.jpg"],
            userInformation : { name : "Hammad", image : "" }
        }
    ]

  return (
    <div className='flex flex-col gap-4'>
        <div className='felx flex-col gap-0'>
            <Heading>
                Ratings and Reviews
            </Heading>
            <p className='text-sm font-text font-medium'>
                Total { ratingsCount } Reviews
            </p>
        </div>

        <div className='pl-8 flex flex-col gap-8'>
            <ReviewsGauge
                avgRating={avgRating}
                ratingsCount={ratingsCount}
                detailedRatingsCount={detailedRatingsCount}
            />

            {
                ratingAndReviews?.length !== 0 ? (
                    <div className='flex flex-col gap-3'>
                        {
                            ratingAndReviews?.map((ratingAndReview, i) => (
                                <RatingAndReviewCard 
                                    key={i} 
                                    ratingAndReview={ratingAndReview} 
                                />
                            ))
                        }
                    </div>
                )
                :
                (
                    <NoQuestions_ReviewsMessage>
                        No rewiews yet on this product !
                    </NoQuestions_ReviewsMessage>
                )
            }

            {
                ratingAndReviews && ratingAndReviews.length !== 0 && (
                    <CtaLink href={`/products/${ratingAndReviews[0].productId}/customer-reviews`}>
                        <p className='font-text font-semibold underline text-themeBlue'>
                            View All
                        </p>
                    </CtaLink>
                )
            }
        </div>
    </div>
  )
}
