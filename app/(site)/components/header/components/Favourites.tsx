"use client"

import { TooltipWrapper } from '@/app/components/TooltipWrapper'
import React from 'react'

import { HiHeart } from "react-icons/hi2"
import { CtaLink } from '../../CtaLink'

export const Favourites = ({
}) => {

  return (
    <div className='h-full flex items-center cursor-pointer'>
      <TooltipWrapper content='Favourites'>
        <CtaLink href='/favourites'>
          <HiHeart
            aria-label='Favourites'
            className='w-7 h-7 md:w-8 md:h-8 text-themeSecondary' 
          />
        </CtaLink>
      </TooltipWrapper>
    </div>
  )
}
