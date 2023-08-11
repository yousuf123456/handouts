import { Button } from '@/app/components/Button'
import React from 'react'

export const Hero = () => {
    const heroHeadingClassName = 'text-2xl md:text-3xl lg:text-4xl font-bold font-superHeading tracking-wider text-themeSecondary'

  return (
    <div className='flex items-center relative w-full h-[240px] sm:h-[300px] lg:h-[368px] bg-slate-200'>
        <div className='absolute h-[180px] w-[180px] md:h-[220px] md:w-[220px] rounded-full bg-slate-400 right-[10%] z-0' />

        <div className='pl-[10%] flex flex-col gap-8 z-10'>
            <div>
                <h1 className={heroHeadingClassName}>
                    Revamp Your Space
                </h1>
                <h1 className={heroHeadingClassName}>
                    With <span className=' bg-clip-text text-transparent bg-gradient-to-r to-blue-500 from-rose-500'>
                        Handouts
                    </span>
                </h1>
            </div>

            <Button size="xl" className='bg-black w-44 text-white hover:bg-slate-800'>
                Shop Now
            </Button>
        </div>
    </div>
  )
}
