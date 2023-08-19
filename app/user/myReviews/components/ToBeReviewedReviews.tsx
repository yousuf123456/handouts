import React from 'react'

import { getUserReviews } from '@/app/actions/getUserReviews';
import { EmptyState } from '../../components/EmptyState';

import { FaSmile } from "react-icons/fa"
import { ToBeReviewedProductCard } from './ToBeReviewedProductCard';
import { OrderType, OrderedProductType } from '@/app/types';
import { Heading } from '@/app/(site)/components/Heading';
import { PaginationControl } from '../../components/PaginationControl';
import { REVIEWS_PER_PAGE } from '@/app/constants/consts';

interface ToBeReviewedReviewsProps {
  pageNumber : number | undefined
}

export const ToBeReviewedReviews: React.FC<ToBeReviewedReviewsProps> = async({
  pageNumber,

}) => {

  const {
    data,
    count

  } = await getUserReviews({ toBeReviewedReviews : true, page : pageNumber }) as { data : OrderedProductType[], count : number };

  if(!data?.length){
    return (
      <EmptyState 
        Icon={FaSmile}
        label='There is no product to be reviewed'
      />
    )
  }

  return (
    <div className='flex flex-col gap-6'>
      <Heading>
        To Be Reviewed { "(" + count + ")" }
      </Heading>
      
      <div className='w-full flex flex-col gap-0'>
        {
          data.map((orderedProduct, i)=> (
            <ToBeReviewedProductCard
              key={i}
              purchasedAt={orderedProduct.createdAt}
              toBeReviewedProduct={orderedProduct}
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
