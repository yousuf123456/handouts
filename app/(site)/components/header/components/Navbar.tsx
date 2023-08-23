import React from 'react'
import Image from "next/image"

import { SearchBar } from './SearchBar'
import { Cart } from './Cart'
import { Button } from '@/app/components/Button'
import { Favourites } from './Favourites'
import { SignCta } from './SignCta'
import { ReduxProvider } from '@/app/context/ReduxProvider'
import { RiShoppingCart2Fill } from 'react-icons/ri'

export const Navbar = () => {

  return (
    <div className='flex flex-col'>
      <div className='w-full md:py-4 pb-0 px-4 sm:px-8 lg:px-12 h-[48px] sm:h-[68px] md:h-20 bg-white min-[420px]:gap-3 lg:gap-6 flex items-center justify-between'>
          <div className='flex gap-2 lg:gap-3 items-center'>
            <div className='relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10'>
              <Image
                  src="/logos/HandoutsLOGO.png"
                  alt='Logo'
                  fill
              />
            </div>

            <div className='flex flex-col gap-[2px]'>
              <p className='mb-0 pb-0 font-heading leading-none tracking-wider lg:tracking-widest text-sm sm:text-base font-extrabold text-themeBlue'>
                Handouts
              </p>

              <p className='hidden lg:block leading-none text-[10px] font-text tracking-wide font-bold text-themeSecondary'>
                Lets decor, born and bred
              </p>
            </div>
          </div>

          <div className='ml-4 flex-grow hidden sm:block'>
            <SearchBar />
          </div>

          <div className='flex ml-2 sm:mx-4 gap-3 md:gap-4 sm:justify-between items-center max-sm:mr-4 max-sm:flex-grow max-sm:flex max-sm:justify-end'>
            <div className='hidden min-[920px]:block'>
              <Favourites />
            </div>

            <div>
              <ReduxProvider>
                <Cart Icon={RiShoppingCart2Fill}/>
              </ReduxProvider>
            </div>
          </div>

          <div className='hidden md:block'>
            <Button variant='outline' size="sm" className='font-semibold text-themeSecondary border-themeSecondary hover:bg-themeSecondary '>
              Sell on Handouts
            </Button>
          </div>

          <div className='sm:hidden'>
            <ReduxProvider>
              <SignCta />
            </ReduxProvider>
          </div>
      </div>

      {/* For the small width devices */}
      <div className='px-4 pb-2 sm:px-8 lg:px-12 w-full block sm:hidden'>
        <SearchBar />
      </div>
    </div>
  )
}
