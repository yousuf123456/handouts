"use client"
import React from 'react'

import { SidebarItem } from './SidebarItem'

import { HiCash, HiTruck, HiHeart, HiLogout, HiStar } from "react-icons/hi"
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa"
import { RiArrowGoBackFill, RiUser5Fill } from "react-icons/ri"

export const Sidebar = () => {
  return (
    <div className='flex-shrink-0 w-64 bg-blue-100'>
        <div className='px-4 py-6 flex flex-col gap-12 justify-between'>
            <div className='flex flex-col gap-6 items-start'>
                <SidebarItem 
                    Icon={RiUser5Fill}
                    label='My Profile'
                    href='/user/profile'
                />

                <SidebarItem 
                    Icon={FaMapMarkerAlt}
                    href='/user/addressDiary'
                    label='Adress Diary'
                />

                <SidebarItem 
                    Icon={HiCash}
                    href='/user/paymentsDiary'
                    label='Payments Diary'
                />

                <SidebarItem 
                    Icon={HiTruck}
                    href='/user/orders'
                    label='My Orders'
                />

                <SidebarItem 
                    Icon={RiArrowGoBackFill}
                    href='/user/returns'
                    label='My Returns'
                />

                <SidebarItem 
                    Icon={FaTimes}
                    href='/user/cancellations'
                    label='My Cancellations'
                />

                <SidebarItem
                    Icon={HiStar}
                    href='/user/myReviews?toBeReviewed=true&isHistory=false'
                    label='My Reviews'
                />

                <SidebarItem 
                    Icon={HiHeart}
                    href='/favourites'
                    label='My Favourites'
                />

            </div>

            <div>
                <SidebarItem 
                    Icon={HiLogout}
                    label='Logout'
                    href='nothing'
                    isLogout={true}
                />
            </div>
        </div>
    </div>
  )
}
