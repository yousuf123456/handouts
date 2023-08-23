"use client"

import React from 'react'
import { TooltipWrapper } from '@/app/components/TooltipWrapper'
import { useAppSelector } from '@/app/store/store'
import { CtaLink } from '../../CtaLink'
import { IconType } from 'react-icons'
import { cn } from '@/lib/utils'

interface CartProps {
    Icon : IconType;
    className? : string;
    numberCs? : string;
}

export const Cart: React.FC<CartProps> = ({
    Icon,
    className,
    numberCs
}) => {
    const numberofItems = useAppSelector(state=> state.cart.cartItemsCount);

  return (
    <div className='relative cursor-pointer h-full flex items-center'>
        <TooltipWrapper content="Cart">
            <CtaLink href='/cart'>
                <Icon 
                    aria-label='Cart'
                    className={cn('w-7 h-7 md:w-8 md:h-8 text-themeSecondary', className)} 
                />
            </CtaLink>
        </TooltipWrapper>
        {
            numberofItems !== null && numberofItems !== 0 && (
                <div className={cn('absolute w-5 h-5 top-[-6px] right-[-6px] flex justify-center items-center rounded-full bg-themeBlue text-white', numberCs)}>
                    <p className='text-[10px] md:text-[13px] font-text font-semibold'>  
                        { numberofItems }
                    </p>
                </div>
            )
        }
    </div>
  )
}
