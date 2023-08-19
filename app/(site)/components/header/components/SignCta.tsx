"use client"
import { Avatar } from '@/app/components/Avatar';
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CtaLink } from '../../CtaLink';
import { useAppDispatch } from '@/app/store/store';
import { setCartItemsCount } from '@/app/store/features/cartSlice';
import { ProfileDropDownMenu } from './ProfileDropDownMenu';

export const SignCta = () => {
    const [hasSetCount, setHasSetCount] = useState(false);

    const session = useSession();
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
            <ProfileDropDownMenu>
                <div className='flex gap-3 items-center cursor-pointer'>
                    <div className='relative w-8 h-8 rounded-full overflow-hidden'>
                        <Avatar image={session.data.user?.image} />
                    </div>

                    <p className='font-text font-semibold text-white hidden sm:block'>
                       { session.data.user?.phone || session.data.user?.name }
                    </p>
                </div>
            </ProfileDropDownMenu>
        ) 
        : 
        (
            <div className='flex h-full gap-2 sm:gap-4 items-center'>
            <Link href={"/user/sign?type=SIGN%20IN"}>
                <p className='font-bold text-sm font-text cursor-pointer hover:text-indigo-800'>
                    Login
                </p>
            </Link>

            <p>|</p>

            <Link href={"/user/sign?type=SIGN%20UP"}>
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
