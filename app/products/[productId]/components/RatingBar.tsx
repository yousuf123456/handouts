"use client"
import { RatingStars } from '@/app/components/RatingStars'
import LinearProgress from '@mui/material/LinearProgress';
import React, { useMemo } from 'react'

interface RatingBarProps {
    ratingNumber : number;
    ratingsCount : number | undefined;
    ratingNumberCount : number | undefined;
}

export const RatingBar: React.FC<RatingBarProps> = ({
    ratingNumber,
    ratingsCount,
    ratingNumberCount
}) => {

    const ratingPercentage = useMemo(()=>{
        if (ratingsCount && ratingNumberCount) {
            return (ratingNumberCount / ratingsCount) * 100
        }
        return 0
    }, [ratingNumberCount, ratingsCount])

  return (
    <div className='flex gap-3 items-center'>
        <RatingStars defaultValue={ratingNumber} size='small' /> 

        <LinearProgress value={ratingPercentage} color='primary' variant="determinate" sx={{ height : 24, width : 248 }} />

        <p className='text-base font-text font-bold text-black'>
            { ratingNumberCount }
        </p>
    </div>
  )
}
