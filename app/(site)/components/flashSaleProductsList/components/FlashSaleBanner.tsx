
import React from 'react'
import { CtaLink } from '../../CtaLink'
import { Button } from '@/app/components/Button'

export const FlashSaleBanner = () => {
  return (
    <div className='bg-rose-500 py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-sm'>
        <div className='flex justify-between items-center'>
            <div className='flex flex-col items-start gap-0'>
                <h2 className='text-white font-heading tracking-wide lg:tracking-wider text-base md:text-base lg:text-lg font-semibold'>
                    Flash Sale
                </h2>

                <div className='block sm:hidden'>
                    <CtaLink href=''>
                        <p className='text-sm text-black font-text font-semibold underline'>
                            Explore All
                        </p>
                    </CtaLink>
                </div>
            </div>

            <div className='flex flex-col items-start sm:flex-row sm:items-center gap-0 sm:gap-4 lg:gap-6'>
                <h3 className='text-white text-base md:text-base lg:text-lg md:tracking-wide font-text font-semibold'>
                    Ending In
                </h3>
                <p className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-text'>
                    12 : 56 : 54
                </p>
            </div>

            <div className='hidden sm:block'>
                <Button className='bg-black text-white hover:bg-slate-800 font-text h-8 md:h-9'>
                    Explore
                </Button>
            </div>
        </div>
    </div>
  )
}
