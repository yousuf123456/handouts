"use client";
import React, { useEffect } from 'react'

import { Heading } from '@/app/(site)/components/Heading'
import { RatingStars } from '@/app/components/RatingStars';
import { RatingAndReview } from '@prisma/client'
import { RatingBar } from './RatingBar';
import { RatingAndReviewCard } from './RatingAndReviewCard';
import { CtaLink } from '@/app/(site)/components/CtaLink';
import { NoQuestions_ReviewsMessage } from './mini/NoQuestions_ReviewsMessage';
import { useAppSelector } from '@/app/store/store';

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
            <div className='flex gap-24 items-center'>
                <div className='flex flex-col gap-0'>
                    <h2 className='text-2xl font-text font-semibold text-themeSecondary'>
                        { avgRating + "/5" }
                    </h2>

                    <div>
                        <RatingStars defaultValue={avgRating ? avgRating : 0} size='large'/>
                        <p className='text-base font-text font-medium text-themeSecondary'>
                            { ratingsCount + " Reviews" }
                        </p>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <RatingBar ratingsCount={ratingsCount} ratingNumberCount={detailedRatingsCount ? detailedRatingsCount["5"] : undefined} ratingNumber={5}/>
                    <RatingBar ratingsCount={ratingsCount} ratingNumberCount={detailedRatingsCount ? detailedRatingsCount["4"] : undefined} ratingNumber={4}/>
                    <RatingBar ratingsCount={ratingsCount} ratingNumberCount={detailedRatingsCount ? detailedRatingsCount["3"] : undefined} ratingNumber={3}/>
                    <RatingBar ratingsCount={ratingsCount} ratingNumberCount={detailedRatingsCount ? detailedRatingsCount["2"] : undefined} ratingNumber={2}/>
                    <RatingBar ratingsCount={ratingsCount} ratingNumberCount={detailedRatingsCount ? detailedRatingsCount["1"] : undefined} ratingNumber={1}/>
                </div>
            </div>
            {/* Have to make it real  */}
            {
                ratingAndReviews?.length ? (
                    <div className='flex flex-col gap-3'>
                        {
                            ratingAndReviews.map((ratingAndReview, i) => (
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
                ratingAndReviews?.length !== 0 && (
                    <CtaLink href=''>
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
