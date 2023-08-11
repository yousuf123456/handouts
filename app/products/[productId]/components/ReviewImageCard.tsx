import React from 'react'
import Image from "next/image"

interface ReviewImageCardProps {
    image : string,
    onClick : ()=>void
}

export const ReviewImageCard: React.FC<ReviewImageCardProps> = ({
    image,
    onClick
}) => {
  return (
    <div onClick={onClick} className='relative w-20 h-24 bg-slate-200'>
        <Image 
            src={image}
            alt='Image'
            className='object-cover cursor-pointer'
            fill
        />
    </div>
  )
}
