import React from 'react'
import { PurchasedTimeline } from './PurchasedTimeline'
import { ProductReview } from '../write-review/components/ProductReview'
import { StoreReview } from '../write-review/components/StoreReview'

interface HistoryReviewCardProps {
    review : any
}

export const HistoryReviewCard: React.FC<HistoryReviewCardProps> = ({
    review
}) => {

    const href = `/user/myReviews/write-review?reviewId=${review.id}&isHistory=true`

  return (
    <div className='px-0 pr-24 py-6 w-full border-b-2 border-r-slate-300'>
        <div className='flex flex-col gap-2'>
            <PurchasedTimeline 
                purchasedAt={review.product.purchasedAt}
            />

            <div className='w-full flex gap-4'>
                <div className='w-full flex flex-col gap-2'>
                    <ProductReview
                        href={href}
                        compact={true}
                        showOnly={true}
                        hideForms={true}
                        showGivenReview={review.review.length > 0}
                        showReviewImages={true}
                        imageAlignment="center"
                        orderedProduct={review}
                        givenReview={review.review}
                        reviewImages={review.reviewImages} 
                        productRatingValue={review.rating}
                    />
                </div>

                <div className='w-[2px] bg-slate-300' />

                <div className='flex flex-col gap-2'>
                    <StoreReview
                        href={href}
                        compact={true}
                        showOnly={true}
                        hideForms={true}
                        showGivenReview={review.sellerReview.length > 0}
                        givenReview={review.sellerReview}
                        storeName={review.product.storeName}
                        storeRatingValue={review.sellerResponse}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
