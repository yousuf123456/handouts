import React from 'react'

import Image from "next/image"
import clsx from 'clsx';

interface ReturnRequestProofsProps {
    feedback : string | null;
    proofImages : string[]
    size? : string;
}

export const ReturnRequestProofs: React.FC<ReturnRequestProofsProps> = ({
    size,
    feedback,
    proofImages
}) => {
  return (
    <div className='mt-6 flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
            <h3 className={clsx('font-text font-semibold text-black', size === "large" ? "text-base" : "text-sm")}>
                Your Feedback
            </h3>

            <div>
                <p className={clsx(' text-black', size === "large" ? "text-base" : "text-sm")}>
                    {feedback}
                </p>
            </div>
        </div>

        <div className='flex gap-2 flex-wrap'>
            {
                proofImages.map((img)=> (
                    <div key={img} className={clsx('relative rounded-[2px] overflow-hidden', size === "large" ? "w-24 h-24" : "w-20 h-20")}>
                        <Image
                            src={img || ""}
                            className='object-cover'
                            alt='Image'
                            fill
                        />
                    </div>
                ))
            }
        </div>
    </div>
  )
}
