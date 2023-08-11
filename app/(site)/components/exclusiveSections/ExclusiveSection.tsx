"use client";

import React from 'react'
import Image from "next/image"
import { Button } from '@/app/components/Button';
import clsx from 'clsx';


interface ExclusiveSectionProps {
    image : string;
    text : string;
    id : string;
    className : string;
}

export const ExclusiveSection: React.FC<ExclusiveSectionProps> = ( {
    image,
    text,
    id,
    className
} ) => { 

  return (
        <div id={id} className={clsx('px-0 sm:px-24 min-[900px]:px-0 relative w-full h-56 min-[470px]:h-72 min-[900px]:h-52 min-[1100px]:h-64', className)}>
            <Image 
                src={image}
                alt='Image'
                fill
                loading="lazy"
                className='object-cover px-0 sm:px-24 min-[900px]:px-0'
            />
            <h1 className='px-2 inline relative top-3 bg-themeSecondary bg-opacity-50 text-white text-xl sm:text-2xl font-bold font-heading'>
                { text }
            </h1>

            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center'>
                <Button
                    variant='default' className='bg-opacity-75 text-xs sm:text-sm'>
                    Explore
                </Button>
            </div>
        </div>
  )
}
