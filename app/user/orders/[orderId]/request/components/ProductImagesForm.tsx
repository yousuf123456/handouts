"use client";

import React from 'react'
import { Heading } from './Heading'
import { ReviewImages } from '@/app/user/myReviews/write-review/components/ReviewImages'
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { addProofImage, removeProofImage } from '@/app/store/features/orderRequestsSlice';

export const ProductImagesForm = () => {

    const images = useAppSelector(state=> state.orderRequests.proofImages);

    const dispatch = useAppDispatch();
    const addImage = (img: string)=> {
        dispatch(addProofImage(img));
    }

    const removeImage = (img: string)=> {
        dispatch(removeProofImage(img))
    }
  return (
    <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
            <Heading>
                Upload Order Pictures
            </Heading>

            <p className='text-sm font-text text-black'>
                Upload some products images as a proof to return the ordered product
            </p>
        </div>

        <ReviewImages 
            images={images}
            addImage={addImage}
            removeImage={removeImage}
        />
    </div>
  )
}
