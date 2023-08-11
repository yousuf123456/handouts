"use client"
import { usePathname } from 'next/navigation';
import React from 'react'
import { Heading } from '../Heading';
import { CtaLink } from '../CtaLink';
import { useFooterLinks } from '@/app/hooks/useFooterLinks';

import { RiCopyrightLine } from "react-icons/ri"
import clsx from 'clsx';

export const Footer = () => {
    const path = usePathname();
    const isSignPage = path === "/user/sign";

    const footerLinks = useFooterLinks();

  return (
    <div className="hidden md:block">
        <div className='relative bg-themeSecondary w-full p-8 sm:p-12 md:p-16 bottom-14 sm:bottom-0'>
            <div className='flex gap-16'>
                {
                    footerLinks.map((footerLink, index)=>(
                        <div key={index} className='flex flex-col gap-1 sm:gap-2'>
                            <Heading className='text-white tracking-wider text-lg md:text-xl'>
                                { footerLink.segment }
                            </Heading>
                            <div className='flex flex-col gap-0.5'>
                                {
                                    footerLink.links.map((link, index) => (       
                                        <div key={index} className='flex flex-col gap-0.5 sm:gap-0 items-start'>
                                            <CtaLink href={link.href}>
                                                <p className='text-xs sm:text-sm font-text text-white underline'>
                                                    { link.name }
                                                </p>
                                            </CtaLink>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='absolute bottom-2 left-8 sm:bottom-4 sm:left-12 md:bottom-6 md:left-16 flex gap-4 items-center'>
                <RiCopyrightLine className='w-6 h-6 text-white' />
                <p className='font-text font-medium text-xs sm:text-sm text-white'>Handouts | 2024</p>
            </div>
        </div>
    </div>
  )
}
