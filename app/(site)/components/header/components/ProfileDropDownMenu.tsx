"use client"
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { FaHome, FaShopify, FaStar, FaTruck, FaUser } from 'react-icons/fa';
import { useRoutes } from '@/app/hooks/useRoutes';
import { HiLogout } from 'react-icons/hi';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';

import Link from 'next/link';

interface ProfileDropDownMenuProps {
    children : React.ReactNode;
    includeAllLinks? : boolean;
}

export const ProfileDropDownMenu: React.FC<ProfileDropDownMenuProps> = ({
    children,
    includeAllLinks
}) => {

    const iconCs = "mr-3 h-5 w-5";
    const {
        home,
        orders,
        profile,
        returns,
        cancellations,
        historyReviews,
        toBeReviewdReviews,

    } = useRoutes()

  return (
    <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
            { children }
        </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className=' text-themeSecondary'>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className='flex flex-col gap-1'>
            {
                includeAllLinks &&
                <Link href={home}>
                    <DropdownMenuItem>
                        <FaHome className={cn(iconCs, "text-themeBlue")} />
                        <span>Home</span>
                    </DropdownMenuItem>
                </Link>
            }

            <Link href={profile}>
                <DropdownMenuItem>
                    <FaUser className={cn(iconCs, "text-themeBlue")} />
                    <span>Profile</span>
                </DropdownMenuItem>
            </Link>

            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <FaTruck className={cn(iconCs, "text-green-500")} />
                    <span>My Orders</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <Link href={orders}>
                        <DropdownMenuItem>
                            <span>All Orders</span>
                        </DropdownMenuItem>
                    </Link>

                    <Link href={cancellations}>
                        <DropdownMenuItem>
                        <span>Cancellations</span>
                        </DropdownMenuItem>
                    </Link>

                    <Link href={returns}>
                        <DropdownMenuItem>
                        <span>Returns</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <FaStar className={cn(iconCs, "text-yellow-400")} />
                    <span>My Reviews</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <Link href={toBeReviewdReviews}>
                        <DropdownMenuItem>
                            <span>To Be Reviewed</span>
                        </DropdownMenuItem>
                    </Link>

                    <Link href={historyReviews}>
                        <DropdownMenuItem>
                            <span>Reviews History</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>

            <Link href={""}>
                <DropdownMenuItem>
                    <FaShopify className={cn(iconCs, "text-purple-500")} />
                    <span>Sell On Handouts</span>
                </DropdownMenuItem>
            </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='mt-3' onClick={()=> signOut()}>
            <HiLogout className={cn(iconCs, "text-rose-500 rotate-180")} />
            <span>Log Out</span>
        </DropdownMenuItem>  

        </DropdownMenuContent>
    </DropdownMenu>
  )
}
