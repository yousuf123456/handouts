"use client"

import React from 'react'
import { RatingBar } from './RatingBar'
import { RatingStars } from '@/app/components/RatingStars';

interface ReviewsGaugeProps {
    avgRating : number | undefined;
    ratingsCount : number | undefined;
    detailedRatingsCount : {
        [key: string]: number;
    } | undefined
}

export const ReviewsGauge: React.FC<ReviewsGaugeProps> = ({
    avgRating,
    ratingsCount,
    detailedRatingsCount
    
}) => {
  return (
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
  )
}
