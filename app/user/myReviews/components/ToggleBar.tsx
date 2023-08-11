"use client";

import { CtaLink } from '@/app/(site)/components/CtaLink';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'

export const ToggleBar = () => {

    const searchParams = useSearchParams();
    const isHistory = searchParams.get("isHistory") === "true";

    const toggleBarItemCs = "px-3 py-1 text-base font-text font-semibold transition-all bg-white cursor-pointer";

  return (
    <div className='p-2 bg-slate-100 w-fit rounded-sm'>
        <div className='flex gap-16'>
            <CtaLink href="/user/myReviews?toBeReviewed=true&isHistory=false">
                <h3 
                    className={clsx(toggleBarItemCs, !isHistory ? "text-themeBlue bg-opacity-100 rounded-sm" : "text-slate-500 bg-opacity-0")}
                >
                    To Be Reviewed
                </h3>
            </CtaLink>

            <CtaLink href='/user/myReviews?toBeReviewed=false&isHistory=true'>
                <h3 
                    className={clsx(toggleBarItemCs, isHistory ? "text-themeBlue bg-opacity-100" : "text-slate-500 bg-opacity-0")}
                >
                    History
                </h3>
            </CtaLink>
        </div>
    </div>
  )
}
