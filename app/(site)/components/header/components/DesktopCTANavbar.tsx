"use client"

import React from 'react'

import { CtaLink } from '../../CtaLink'
import { SignCta } from './SignCta'
import { usePathname } from 'next/navigation'
import { ReduxProvider } from '@/app/context/ReduxProvider'
import { Categories } from './Categories'

export const DesktopCTANavbar = () => {

  const links = [
    {
      name : "Hot Deals",
      href : ""
    },
    {
      name : "Orders",
      href : "/user/orders"
    },
    {
      name : "Returns",
      href : "/user/returns"
    },
    {
      name : "Customer Care",
      href : ""
    }
  ];

  const isSignPage = usePathname() === "/user/sign"

  return (
    <div className='h-10 lg:h-12 bg-themeBlue bg-opacity-80 px-8 sm:px-12 md:px-16 lg:px-24 flex justify-between items-center shadow-lg'>
      <div className='h-full flex gap-4 sm:gap-8 lg:gap-12 items-center'>
        <Categories />

        {
        !isSignPage && (
          <div className='hidden min-[920px]:flex gap-4 items-center'>
            {
              links.map((link) => (
                <CtaLink key={link.name} href={link.href}>
                  <p className='whitespace-nowrap underline font-text text-sm font-medium text-white'>
                    { link.name }
                  </p>
                </CtaLink>
              ))
            }
          </div>
        )}
      </div>

      {
        !isSignPage && (
          <div className='flex sm:block'>
            <ReduxProvider>
              <SignCta />
            </ReduxProvider>
          </div>
        )
      }
    </div>
  )
}
