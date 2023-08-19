import React from 'react'

import { getUserReviews } from '@/app/actions/getUserReviews'
import { EmptyState } from '../../components/EmptyState';
import { FaSmile } from 'react-icons/fa';
import { HistoryReviewCard } from './HistoryReviewCard';
import { Heading } from '@/app/(site)/components/Heading';
import { HistoryReviewType } from '@/app/types';
import { Pagination } from '@mui/material';
import { PaginationControl } from '../../components/PaginationControl';
import { REVIEWS_PER_PAGE } from '@/app/constants/consts';

interface HistoryReviewsProps {
  pageNumber : number | undefined;
}

export const HistoryReviews: React.FC<HistoryReviewsProps> = async({
  pageNumber
  
}) => {
  const {
    data, 
    count

  } = await getUserReviews({ toBeReviewedReviews : false, page : pageNumber }) as unknown as {data : HistoryReviewType[], count : number};

  if(!data?.length){
    return (
      <EmptyState 
        Icon={FaSmile}
        label='There is no review in your history yet'
      />
    )
  }

  return (
    <div className='flex flex-col gap-6'>
      <Heading>
        My Reviews { "(" + count + ")" }
      </Heading>

      <div className='w-full flex flex-col gap-0'>
        {
          data.map((review, i)=> (
            <HistoryReviewCard 
              key={i}
              review={review}
            />
          ))
        }
      </div>

      <PaginationControl
        count={count}
        offset={true}
        ITEMS_PER_PAGE={REVIEWS_PER_PAGE}
      />
    </div>
  )
}
