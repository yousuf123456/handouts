"use client"

import React, { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { CtaLink } from '../../CtaLink'
import clsx from 'clsx'
import { SignCta } from './SignCta'
import { usePathname } from 'next/navigation'
import { ReduxProvider } from '@/app/context/ReduxProvider'
import { Button } from '@/app/components/Button'
import { signOut } from 'next-auth/react'
import { Categories } from './Categories'

export const DesktopCTANavbar = () => {

  const links = ["Hot Deals", "Orders", "Returns", "Customer Care"];

  const isSignPage = usePathname() === "/user/sign"

  return (
    <div className='h-10 lg:h-12 bg-themeBlue bg-opacity-80 px-8 sm:px-12 md:px-16 lg:px-24 flex justify-between items-center shadow-lg'>
      <div className='h-full flex gap-4 sm:gap-8 lg:gap-12 items-center'>
        <Categories />

        {
        !isSignPage && (
          <div className='hidden md:flex gap-4 items-center'>
            {
              links.map((link) => (
                <CtaLink key={link} href=''>
                  <p className='whitespace-nowrap underline font-text text-sm font-medium text-white'>
                    { link }
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
            {/* <Button size={"sm"} onClick={()=> signOut()} >
              Logout
            </Button> */}
          </div>
        )
      }
    </div>
  )
}
