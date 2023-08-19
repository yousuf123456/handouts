
import { Heading } from '@/app/(site)/components/Heading'
import { SkeletonBox } from '@/app/components/SkeletonBox';

import React from 'react'

interface LoadingProps {
    heading : string;
}

export const Loading: React.FC<LoadingProps> = ({
    heading
}) => {

  return (
    <div className='w-full flex flex-col gap-6'>
        <Heading>
            { heading }
        </Heading>

        <div className='w-full flex flex-col gap-6'>
            {
                Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className='w-full flex flex-col gap-6'>
                        <div className='w-full flex flex-col gap-3'>
                            <div className='flex justify-between items-center'>
                                <SkeletonBox className='w-28 h-6'/>
                                <SkeletonBox className='w-28 h-6'/>
                            </div>

                            <SkeletonBox className='w-full h-28'/>
                        </div>

                        {index !== 3 && <div className='w-full h-[1px] bg-slate-300' />}
                    </div>
                ))
            }        
        </div>
    </div>
  )
}
