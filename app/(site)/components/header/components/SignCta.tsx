"use client"
import { Avatar } from '@/app/components/Avatar';
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CtaLink } from '../../CtaLink';
import { useAppDispatch } from '@/app/store/store';
import { setCartItemsCount } from '@/app/store/features/cartSlice';

export const SignCta = () => {
    const session = useSession();
    const [hasSetCount, setHasSetCount] = useState(false);
    const isLoggedIn = session.status === "authenticated";
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if(session.status === "authenticated" && !hasSetCount) {
            dispatch(setCartItemsCount(session.data.user?.cartItemsCount!))
            setHasSetCount((prev)=>true)
            console.log("Dispatching ", session.data.user?.cartItemsCount)
        }
    }, [session.status])

  return (
    <div>
        {
        isLoggedIn ? (
            <div className='flex gap-3 items-center'>
                <div className='relative w-8 h-8 rounded-full overflow-hidden'>
                    <Avatar image={session.data.user?.image} />
                </div>

                <CtaLink href=''>
                    <p className='font-text font-semibold text-white hidden sm:block'>
                        { session.data.user?.phone || session.data.user?.name }
                    </p>
                </CtaLink>
            </div>
        ) 
        : 
        (
            <div className='flex h-full gap-2 sm:gap-4 items-center'>
            <Link href={"/user/sign"}>
                <p className='font-bold text-sm font-text cursor-pointer hover:text-indigo-800'>
                    Login
                </p>
            </Link>

            <p>|</p>

            <Link href={"/user/sign"}>
                <p className='whitespace-nowrap font-bold text-sm font-text cursor-pointer hover:text-indigo-800'>
                    Sign Up
                </p>
            </Link>
            </div>
        )
        }
    </div>
  )
}
