'use client'
import React, { useState } from 'react'

import { OrderedProductType } from '@/app/types'
import { ProductInfo } from './productInfo'
import { RatingStarsForm } from './RatingStarsForm'
import { ProductImage } from '@/app/components/ProductImage'
import { ReviewForm } from './ReviewForm'
import { ReviewImages } from './ReviewImages'
import clsx from 'clsx'

import Image from 'next/image'


interface ProductReviewProps {
  href? : string;
  images? : string[];
  review? : string;
  compact? : boolean;
  showOnly? : boolean;
  hideForms? : boolean;
  givenReview? : string;
  reviewImages? : string[];
  showGivenReview? : boolean;
  showReviewImages? : boolean;
  imageAlignment? : "center"
  productRatingHover? : number;
  productRatingValue : number;
  orderedProduct : OrderedProductType;
  setImages? : React.Dispatch<React.SetStateAction<string[]>>
  setReview? : React.Dispatch<React.SetStateAction<string>>;
  setProductRatingHover? : React.Dispatch<React.SetStateAction<number>>;
  setProductRatingValue? : React.Dispatch<React.SetStateAction<number>>;
}

export const ProductReview: React.FC<ProductReviewProps> = ({
  orderedProduct,
  productRatingValue,
  productRatingHover,
  showReviewImages,
  showGivenReview,
  imageAlignment,
  reviewImages,
  givenReview,
  hideForms,
  showOnly,
  compact,
  review,
  images,
  href,
  setImages,
  setProductRatingHover,
  setProductRatingValue,
  setReview
}) => {
  const placeholder = `1. Apny Product / Order ki pictures upload karen.
2. Product na pasend any py 1 ya 2 star select karen. 
3. Product kay experience ke bary main batayen`

  const showFormsCondition = !hideForms && review !== undefined && setReview !== undefined && images !== undefined && setImages !== undefined

  const addImage = (img: string)=> {
    setImages && setImages((prev)=> [...prev, img]);
  }

  const removeImage = (img: string)=> {
    const updatedImages = images?.filter((image)=> image !== img);

    setImages && setImages(updatedImages || []);
  }

  return (
    <div className={clsx('w-full flex gap-3 items-start')}>
      <div className='flex-shrink-0 relative w-14 h-14 rounded-[2px] overflow-hidden'>
        <ProductImage
          src={orderedProduct.product.image || ""}
        />
      </div>

      <div className={clsx('w-full flex flex-col items-start', compact ? "gap-2" : "gap-8")}>
        <ProductInfo 
          orderedProduct={orderedProduct}
        />

        <RatingStarsForm 
          href={href}
          showOnly={showOnly}
          value={productRatingValue}
          hover={productRatingHover}
          setValue={setProductRatingValue}
          setHover={setProductRatingHover}
        />

        {
          showGivenReview &&
          <div className='mt-3 p-2 w-full min-h-[80px] bg-slate-100'>
            <p className='text-sm font-text text-black'>
              { givenReview }
            </p>
          </div>
        }

        {
          showReviewImages &&
          <div className='mt-1 flex gap-2'>
            {
              reviewImages?.map((reviewImage, i)=> (
                <div key={i} className='relative w-20 h-20 rounded-[2px] overflow-hidden'>
                  <Image
                    src={reviewImage}
                    alt='Image'
                    className='object-cover'
                    fill
                  />
                </div>
              ))
            }
          </div>
        }

        {
          showFormsCondition && (
            <ReviewForm 
              review={review}
              setReview={setReview}
              label="Please share your product experience. Was the product as described? What is the quality like? What did you like or dislike about the product?"
              placeholder={placeholder}
            />
          )
        }
        {
          showFormsCondition && (
            <ReviewImages 
              images={images}
              addImage={addImage}
              removeImage={removeImage}
            />
          )
        }
      </div>
    </div>
  )
}
