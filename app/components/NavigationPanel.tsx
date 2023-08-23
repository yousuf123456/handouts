"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisVertical } from 'react-icons/hi2'
import { ShoppingCart } from 'lucide-react'
import { Cart } from '../(site)/components/header/components/Cart'
import { ReduxProvider } from '../context/ReduxProvider'
import { SearchBar } from '../(site)/components/header/components/SearchBar'
import { ProfileDropDownMenu } from '../(site)/components/header/components/ProfileDropDownMenu'

interface NavigationPanelProps {
    heading? : string;
    showCart? : boolean;
    showSearchBar? : boolean;
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({
    heading,
    showCart,
    showSearchBar
}) => {

    const router = useRouter();
    const onBack = ()=> router.back()

  return (
    <div className='min-[420px]:p-4 px-2 py-3 bg-themeBlue sm:hidden'>
        <div className='flex gap-3 justify-between'>
            <div className='flex items-center gap-2'>
                <HiChevronLeft onClick={onBack} className='w-6 h-6 text-white'/>
                {heading && <p className='text-white'>{heading}</p>}
            </div>

            {showSearchBar && <SearchBar doWhiteBg={true}/>}

            <div className='flex items-center gap-2'>
                {
                    showCart &&
                    <ReduxProvider>
                        <Cart Icon={ShoppingCart} className='w-5 h-5 text-white' numberCs="w-4 h-4 bg-white text-themeBlue"/>
                    </ReduxProvider>
                }

                <ProfileDropDownMenu includeAllLinks={true}>
                    <div>
                        <HiEllipsisVertical className='w-6 h-6 text-white'/>
                    </div>
                </ProfileDropDownMenu>
            </div>
        </div>
    </div>
  )
}
