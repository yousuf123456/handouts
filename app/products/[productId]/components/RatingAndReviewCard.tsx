"use client"
import React, { useState } from 'react'

import { Avatar } from '@/app/components/Avatar';
import { RatingStars } from '@/app/components/RatingStars';
import { ReviewImageCard } from './ReviewImageCard';
import { ImageModel } from '@/app/components/ImageModel';
import { HeaderInfo } from './mini/HeaderInfo';
import { Review_Question } from './mini/Review_Question';

import {RiStore3Fill} from "react-icons/ri"

interface RatingAndReviewCardProps {
  // I need to update it later because they are fake now
  ratingAndReview : any
}

export const RatingAndReviewCard: React.FC<RatingAndReviewCardProps> = ({
  ratingAndReview
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = ()=>setOpen(false);

  return (
    <div className='flex flex-col gap-2'>
    <div className='flex items-start gap-4'>
        <div className='relative w-9 h-9 rounded-full overflow-hidden'>
          <Avatar image={ratingAndReview.userInformation.image}/>
        </div>

        <div className='flex flex-col gap-0'>
          <div className='flex justify-between gap-6 items-center'>
            <HeaderInfo 
              name={ratingAndReview.userInformation.name}
              date={ratingAndReview.createdAt}
            />

            <div className='flex gap-1 items-center'>
              <p className='relative -top-0.5 font-medium text-slate-600'>|</p>
              <RatingStars defaultValue={ratingAndReview.rating} size='small' />
            </div>
          </div>

          <div>
            <Review_Question>
              { ratingAndReview.review }
            </Review_Question>
          </div>

          <div className='mt-2 flex flex-wrap gap-2'>
            {
              ratingAndReview?.reviewImages?.map((reviewImage : string, i : number) => (
                <div key={i}>
                <ImageModel handleClose={handleClose} open={open} image={reviewImage} />
                <ReviewImageCard 
                  image={reviewImage}
                  onClick={()=>setOpen(true)}
                />
                </div>
              ))
            }
          </div>
        </div>
    </div>
    
    {
      ratingAndReview?.answer?.length > 0 &&
      <div className='p-4 pl-12 flex flex-col gap-2 bg-blue-50'>
        <div className='flex gap-3 items-center'>
          <RiStore3Fill className='w-8 h-8 text-indigo-900'/>
          <HeaderInfo 
            name='Store Response' 
            date={ratingAndReview.answeredAt} 
            className='text-base font-medium text-themeBlue'
          />
        </div>
        <Review_Question>
          { ratingAndReview.answer }
        </Review_Question>
      </div>
    }
    </div>
  )
}
