import { getProductById } from '@/app/actions/getProductById';
import { getUserReviewById } from '@/app/actions/getUserReviewById';
import React from 'react'
import { ProductReview } from './ProductReview';
import { OrderedProduct, RatingAndReview } from '@prisma/client';
import { getOrderedProductById } from '@/app/actions/getOrderedProductById';
import { OrderedProductType } from '@/app/types';
import { StoreReview } from './StoreReview';
import { WriteReviewForm } from './WriteReviewForm';

type Return = {
    productReview : RatingAndReview,
    orderedProduct : OrderedProduct
} | boolean

interface SearchParams {
    reviewId? : string;
    productId? : string;
    isHistory? : string;
    orderedProductId? : string;
}

interface WriteReviewProps {
    searchParams : SearchParams
}

export const WriteReview: React.FC<WriteReviewProps> = async({
    searchParams
})=> {
    
    const isHistory = searchParams.isHistory === "true"
    let info;

    if(isHistory) {
        info = await getUserReviewById(searchParams.reviewId);
    }

    const orderedProduct = !isHistory && await getOrderedProductById(searchParams.orderedProductId);

    const OrderedProduct = isHistory ? info?.orderedProduct as OrderedProductType : orderedProduct as unknown as OrderedProductType

  return (
    <WriteReviewForm 
        isHistory={isHistory}
        reviewId={searchParams.reviewId}
        OrderedProduct={OrderedProduct}
        givenReview={info?.productReview}
    />
  )
}
