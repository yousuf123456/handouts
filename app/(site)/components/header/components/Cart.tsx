"use client"

import { TooltipWrapper } from '@/app/components/TooltipWrapper'
import React from 'react'
import { RiShoppingCart2Fill } from "react-icons/ri"
import { useAppSelector } from '@/app/store/store'
import { CtaLink } from '../../CtaLink'

export const Cart = ({

}) => {
    const numberofItems = useAppSelector(state=> state.cart.cartItemsCount);

  return (
    <div className='relative cursor-pointer h-full flex items-center'>
        <TooltipWrapper content="Cart">
            <CtaLink href='/cart'>
                <RiShoppingCart2Fill 
                    // onClick={onClick}
                    aria-label='Cart'
                    className='w-7 h-7 md:w-8 md:h-8 text-themeSecondary' 
                />
            </CtaLink>
        </TooltipWrapper>
        {
            numberofItems !== null && numberofItems !== 0 && (
                <div className='absolute w-5 h-5 top-[-6px] right-[-6px] flex justify-center items-center rounded-full bg-themeBlue'>
                    <p className='text-[10px] md:text-[13px] font-text font-semibold text-white'>  
                        { numberofItems }
                    </p>
                </div>
            )
        }
    </div>
  )
}
