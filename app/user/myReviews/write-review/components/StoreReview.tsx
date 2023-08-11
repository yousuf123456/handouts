import React from 'react'
import { ResponsesForm } from './ResponsesForm';
import { ReviewForm } from './ReviewForm';
import clsx from 'clsx';

interface StoreReviewProps {
    href? : string;
    storeName : string
    storeRatingHover? : number;
    storeRatingValue : number | null;
    showGivenReview? : boolean;
    givenReview? : string;
    hideForms? : boolean;
    showOnly? : boolean;
    compact? : boolean;
    sellerReview? : string;
    setSellerReview? : React.Dispatch<React.SetStateAction<string>>;
    setStoreRatingHover? : React.Dispatch<React.SetStateAction<number>>;
    setStoreRatingValue? : React.Dispatch<React.SetStateAction<number | null>>;
}

export const StoreReview: React.FC<StoreReviewProps> = ({
    href,
    storeName,
    storeRatingValue,
    storeRatingHover,
    showGivenReview,
    givenReview,
    compact,
    showOnly,
    hideForms,
    sellerReview,
    setSellerReview,
    setStoreRatingValue,
    setStoreRatingHover
}) => {

    const placeholder = `1. How was your experience with the seller?
2. Was the seller helpfull or not?
3. How satisfied were you with the product's packaging?`

    const showFormsCondition =  !hideForms !== undefined && storeRatingHover !== undefined && sellerReview !== undefined && setSellerReview !== undefined && setStoreRatingHover !== undefined && setStoreRatingValue !== undefined

  return (
    <div className={clsx('flex-shrink-0 flex flex-col items-start', !compact ? "w-72 gap-8" : "w-64 gap-3")}>
        <div className='flex gap-2 items-center'>
            <p className='text-sm font-text text-slate-700'>Sold By</p>
            <p className='text-sm font-text text-themeBlue'>{ storeName }</p>
        </div>

        <div className='flex flex-col gap-2'>
            {
                !hideForms &&
                <p className='text-sm font-medium text-black'>Rate and Review your seller</p>
            }

            <ResponsesForm 
                href={href}
                compact={compact}
                showOnly={showOnly}
                value={storeRatingValue}
                hover={storeRatingHover}
                setValue={setStoreRatingValue}
                setHover={setStoreRatingHover}
            />
        </div>
        
        {
            showGivenReview &&
            <div className='p-2 min-h-[80px] w-full bg-slate-100'>
                <p className='text-sm font-text text-black'>
                    { givenReview }
                </p>  
            </div>
        }
        
        {
            showFormsCondition && 
            <div className='mt-4'>
                <ReviewForm 
                    review={sellerReview}
                    label='Please share your reviews ragarding the seller. Was he cooperative or not ?'
                    setReview={setSellerReview}
                    placeholder={placeholder}
                />
            </div>
        }
    </div>
  )
}
