import React from 'react'
import { ProductReviews } from '../ProductReviews'
import { getProductReviewsById } from '@/app/actions/getProductDetailsById/getProductReviewsById'
import { ReduxProvider } from '@/app/context/ReduxProvider'


interface ReviewsProps {
  productId : string
}

export const Reviews: React.FC<ReviewsProps> = async({
  productId
}) => {
  const ratingAndReviews= await getProductReviewsById(productId);

  return (
    <ReduxProvider>
      <ProductReviews 
        ratingAndReviews={ratingAndReviews} 
      />
    </ReduxProvider>
  )
}
