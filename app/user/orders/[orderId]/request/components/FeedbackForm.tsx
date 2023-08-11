"use client";

import React from 'react'
import { Heading } from './Heading'
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { setFeedback } from '@/app/store/features/orderRequestsSlice'

export const FeedbackForm = () => {

  const placeholder = "e.g. My order seal was opened (OR) The product was damaged (OR) The packaging was damaged "
  const dispatch = useAppDispatch();

  const feedback = useAppSelector(state=> state.orderRequests.feedback);

  return (
    <div className='flex flex-col gap-3'>
      <Heading>
        Customer Reviews Regarding Order
      </Heading>

      <Textarea 
        value={feedback}
        placeholder={placeholder}
        onChange={(e)=> dispatch(setFeedback(e.target.value))}
      />
    </div>
  )
}
