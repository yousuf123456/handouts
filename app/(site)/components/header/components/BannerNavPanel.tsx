"use client"

import React from 'react'
import { ProfileDropDownMenu } from './ProfileDropDownMenu'
import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisVertical } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'

interface BannerNavPanelProps {
    heading : string;
}

export const BannerNavPanel: React.FC<BannerNavPanelProps> = ({
    heading
}) => {

    const router = useRouter()
    const onBack = ()=> router.back()

  return (
      <div className='px-6 sm:hidden w-full flex justify-between items-center'>
        <div className='p-0.5 bg-white rounded-sm cursor-pointer' onClick={onBack}>
          <HiChevronLeft className='w-6 h-6 text-slate-900'/>
        </div>

        <h3 className='text-lg text-white font-text font-medium'>{heading}</h3>

        <ProfileDropDownMenu includeAllLinks={true}>
          <div>
            <HiEllipsisVertical className='w-6 h-6 text-white'/>
          </div>
        </ProfileDropDownMenu>
      </div>
  )
}
