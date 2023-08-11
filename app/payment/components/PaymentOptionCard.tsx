import clsx from 'clsx';
import React from 'react'

import Image from "next/image"

interface PaymentOptionCardProps {
    label : string;
    image : string;
    isSelected : boolean;
    onClick : ()=> void;
}

export const PaymentOptionCard: React.FC<PaymentOptionCardProps> = ({
    label,
    image,
    isSelected,
    onClick
}) => {
  return (
    <div 
        className='relative w-36 h-36 bg-white rounded-sm flex flex-col gap-6 justify-center items-center cursor-pointer'
        onClick={onClick}
    >
        <div className={clsx('relative overflow-visible', label === "Jazzcash" ? "w-24 h-12" : "h-12 w-12")}>
            <Image 
                src={image}
                alt='Icon'
                className='object-fit'
                fill
            />
        </div>

        <p className='text-sm font-text font-semibold text-themeSecondary'>
            { label }
        </p>

        <div className={clsx('absolute transition-all h-1 left-0 -bottom-2 bg-blue-500', isSelected ? "w-full" : "w-0")} />
        <div className={clsx('absolute transition-all h-1 left-0 -top-2 bg-blue-500', isSelected ? "w-full" : "w-0")} />
        <div className={clsx('absolute transition-all w-1 -left-2 bottom-0 bg-blue-500', isSelected ? "h-full" : "h-0")} />
        <div className={clsx('absolute transition-all w-1 -right-2 bottom-0 bg-blue-500', isSelected ? "h-full" : "h-0")} />
    </div>
  )
}
