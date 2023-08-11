import Rating from '@mui/material/Rating'
import { HiStar } from "react-icons/hi"
import React from 'react'

interface RatingStarsProps {
  defaultValue : number,
  size? : "small" | "medium" | "large"
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  defaultValue,
  size
}) => {

  return (
    <Rating  
      name="half-rating-read" 
      value={defaultValue}
      // defaultValue={defaultValue} 
      precision={0.5} 
      size={size} 
      icon={<div><HiStar className='text-[15px] sm:text-[16px] md:text-inherit' /></div>}
      emptyIcon={<HiStar className='text-slate-300 text-[15px] sm:text-[16px] md:text-inherit'/>}
      readOnly 
    />
  )
}
