import React from 'react'

import { OrderedProductType } from '@/app/types'
import { OrderRequest_OrderedProductCard } from '../../orders/components/OrderRequest_OrderedProductCard'
import { PurchasedTimeline } from './PurchasedTimeline'
import { ReviewCta } from './ReviewCta'

type ProductInfo = {

}

interface ToBeReviewedProductCardProps {
  toBeReviewedProduct : OrderedProductType;
  purchasedAt : Date;
}

export const ToBeReviewedProductCard: React.FC<ToBeReviewedProductCardProps> = ({
  toBeReviewedProduct,
  purchasedAt,
}) => {

  return (
    <div className='px-0 pr-36 py-3 w-full border-b-2 border-slate-300'>
      <div className='flex flex-col gap-2'>
        <PurchasedTimeline 
          purchasedAt={purchasedAt}
        />

        <div className='w-full flex gap-4'>
          <OrderRequest_OrderedProductCard 
            orderedProduct={toBeReviewedProduct}
            hideCancelButton={true}
            hideStatus={true}
            hidePrice={true}
          />

          <div className='w-[2px] bg-slate-300 ml-4' />

          <ReviewCta 
            storeName={toBeReviewedProduct.product.storeName}
            productId={toBeReviewedProduct.product.id}
            orderedProductId={toBeReviewedProduct.id}
            isHistory={false}
          />
        </div>
      </div>
    </div>
  )
}
