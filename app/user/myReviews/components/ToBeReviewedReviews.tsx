import React from 'react'

import { getUserReviews } from '@/app/actions/getUserReviews';
import { EmptyState } from '../../components/EmptyState';

import { FaSmile } from "react-icons/fa"
import { ToBeReviewedProductCard } from './ToBeReviewedProductCard';
import { OrderType, OrderedProductType } from '@/app/types';

export const ToBeReviewedReviews = async() => {

  const toBeReviewedProductOrders = await getUserReviews({ toBeReviewedReviews : true }) as OrderType[];

  if(!toBeReviewedProductOrders?.length){
    return (
      <EmptyState 
        Icon={FaSmile}
        label='There is no product to be reviewed'
      />
    )
  }

  return (
    <div className='w-full flex flex-col gap-0'>
      {
        toBeReviewedProductOrders.map((toBeReviewedProductOrder, i)=> (
          toBeReviewedProductOrder.packages.map((Package)=> (
            Package.orderedProducts.map((orderedProduct, i)=> (
              <ToBeReviewedProductCard 
                key={i}
                purchasedAt={toBeReviewedProductOrder.createdAt}
                toBeReviewedProduct={orderedProduct as unknown as OrderedProductType}
              />
            ))
          ))
        ))
      }
    </div>
  )
}
