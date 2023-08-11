import React from 'react'

import Image from "next/image"

interface FeaturedCategoryCard {
  name : string;
  desc : string;
  image : string;
}

export const FeaturedCategoryCard: React.FC<FeaturedCategoryCard> = ({
  name,
  desc,
  image
}) => {
  return (
    <div className='cursor-pointer flex flex-col gap-4 w-48 sm:w-56 lg:w-64 group'>
      <div className='relative w-full h-32 sm:h-36 lg:h-44 rounded-2xl overflow-hidden'>
        <Image 
          src={image}
          alt="Image"
          fill
          loading="lazy"
          className='object-cover transition-all sm:grayscale-[50%] sm:group-hover:grayscale-0 sm:group-hover:scale-110'
        />
      </div>

      <div className='flex flex-col gap-1'>
        <h3 className='text-sm md:text-base font-semibold font-heading text-themeSecondary'>
          { name }
        </h3>

        <p className='text-[10px] sm:text-xs font-text font-medium'>
          { desc }
        </p>
      </div>
    </div>
  )
}
