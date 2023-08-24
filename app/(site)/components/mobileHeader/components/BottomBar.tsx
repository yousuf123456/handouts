"use client"

import React from 'react'
import { useBottomBarLinks } from '@/app/hooks/useBottomBarLinks'
import { LinkOption } from './LinkOption'
import { usePathname } from 'next/navigation'

export const BottomBar = () => {

    const pathname = usePathname();
    const links = useBottomBarLinks();

  return (  
    <div className='fixed w-full h-14 flex items-center left-0 bottom-0 bg-white border-t-[1px] border-t-slate-400 z-[999]'>
        <div className='w-full flex justify-evenly'>
            {
                links.map((link, i)=> (
                    <LinkOption 
                        key={i}
                        isSelected={pathname.includes(link.href)}
                        link={link}
                    />
                ))
            }
        </div>
    </div>
  )
}
