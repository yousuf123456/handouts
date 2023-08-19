import React from 'react'
import { NavigationItem } from '../../components/NavigationItem'

import { RiShoppingCart2Fill } from "react-icons/ri"
import { RiStore3Fill } from "react-icons/ri"
import { RiWalletFill } from "react-icons/ri"
import { Total_Checkout } from './Total_Checkout'
import { ReduxProvider } from '@/app/context/ReduxProvider'

export const CartBanner = () => {
  return (
    <div className='px-[15%] h-72 w-full flex flex-col justify-center gap-12 bg-slate-900'>
      <div className='mt-4 relative flex gap-0 justify-center items-center'>
        <NavigationItem Icon={RiStore3Fill} className='bg-yellow-500' lineClassName='from-yellow-500 to-green-500' label='From Shop'/>
        <NavigationItem Icon={RiShoppingCart2Fill} className='bg-green-500' lineClassName='from-green-500 to-purple-500' label='To Cart' isSelected={true}/>
        <NavigationItem Icon={RiWalletFill} className='bg-purple-600' label='Next Checkout' isLast={true}/>
      </div>

      <div className='w-full flex flex-col items-end gap-4'>
        <ReduxProvider>
          <Total_Checkout />
        </ReduxProvider>
      </div>
    </div>
  )
}
