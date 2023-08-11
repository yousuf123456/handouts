import React from 'react'
import { NavigationItem } from '../../components/NavigationItem'

import { RiShoppingCart2Fill } from "react-icons/ri"
import { RiStore3Fill } from "react-icons/ri"
import { RiWalletFill } from "react-icons/ri"
import { Total_Checkout } from './Total_Checkout'
import { ReduxProvider } from '@/app/context/ReduxProvider'

export const CartBanner = () => {
  return (
    <div className='px-[15%] h-72 w-full flex flex-col justify-center bg-slate-900'>
      <div className='mt-4 relative w-full flex justify-between items-center'>
        <NavigationItem Icon={RiStore3Fill} label='From Shop'/>
        <NavigationItem Icon={RiShoppingCart2Fill} label='To Cart' isSelected={true}/>
        <NavigationItem Icon={RiWalletFill} label='Next Checkout'/>
        
        <div className='absolute w-full flex justify-center'>
            <div className='absolute -top-3 w-[91%] h-0.5 bg-green-500 flex'/>
        </div>
      </div>

      <div className='mb-8 w-full flex flex-col items-end gap-4'>
        <ReduxProvider>
          <Total_Checkout />
        </ReduxProvider>
      </div>
    </div>
  )
}
