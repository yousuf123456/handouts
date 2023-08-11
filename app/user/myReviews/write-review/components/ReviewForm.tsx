"use client"
import React from 'react'

import { Textarea } from '@/components/ui/textarea'

interface ReviewFormProps {
  review : string;
  label : string;
  setReview : React.Dispatch<React.SetStateAction<string>>;
  placeholder : string;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  label,
  review,
  setReview,
  placeholder,
}) => {

  return (
    <div className='flex flex-col gap-2'>
      <p className='text-xs text-black'>
        { label }
      </p>

      <Textarea 
        value={review}
        className='h-24'
        placeholder={placeholder}
        onChange={(e)=>setReview(e.target.value)}
      />
    </div>
  )
}
