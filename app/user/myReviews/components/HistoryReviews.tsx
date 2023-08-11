import { getUserReviews } from '@/app/actions/getUserReviews'
import React from 'react'
import { EmptyState } from '../../components/EmptyState';
import { FaSmile } from 'react-icons/fa';
import { HistoryReviewCard } from './HistoryReviewCard';

export const HistoryReviews = async() => {
  const historyReviews = await getUserReviews({ toBeReviewedReviews : false });

  if(!historyReviews?.length){
    return (
      <EmptyState 
        Icon={FaSmile}
        label='There is no review in your history yet'
      />
    )
  }

  return (
    <div className='w-full flex flex-col gap-0'>
      {
        historyReviews.map((review, i)=> (
          <HistoryReviewCard 
            key={i}
            review={review}
          />
        ))
      }
    </div>
  )
}
