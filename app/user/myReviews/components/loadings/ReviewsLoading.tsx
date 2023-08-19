import { Heading } from '@/app/(site)/components/Heading'
import { SkeletonBox } from '@/app/components/SkeletonBox'
import React from 'react'

export const ReviewsLoading = () => {
  return (
    <div className='flex flex-col gap-6'>
        <Heading>
            To Be Reviewed
        </Heading>

        <div className='flex flex-col gap-4'>
            {
                Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-3'>
                            <SkeletonBox className='h-3 w-64'/>
 
                            <div className='pr-32 flex gap-6'>
                                <div className='w-full flex justify-between'>
                                    <div className='flex gap-4'>
                                        <SkeletonBox className='w-24 h-24'/>
                                        <SkeletonBox className='h-5 w-44'/>
                                    </div>

                                    <SkeletonBox className='h-5 w-24'/>
                                </div>

                                <div className='w-[1px] h-full bg-slate-300'/>

                                <div className='ml-4 flex flex-col gap-4'>
                                    <SkeletonBox className='h-5 w-28'/>
                                    <SkeletonBox className='h-6 w-28'/>
                                </div>
                            </div>
                        </div>

                        {index !== 3 && <div className='w-full h-[1px] bg-slate-300'/>}
                    </div>
                ))
            }
        </div>
    </div>
  )
}
