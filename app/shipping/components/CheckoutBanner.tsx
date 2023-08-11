import React from 'react'
import { RiShoppingCart2Fill } from "react-icons/ri"
import { RiWalletFill } from "react-icons/ri"

import { NavigationItem } from '@/app/components/NavigationItem'
import { HiCash } from 'react-icons/hi'
import { Total_PlaceOrder } from './Total_PlaceOrder'
import { ReduxProvider } from '@/app/context/ReduxProvider'
import { CartItemProductType } from '@/app/types'
import { AddressInfo } from './AddressInfo'

interface CheckoutBannerProps {
  fromCart : boolean | undefined;
  product : CartItemProductType[] | null;
}

export const CheckoutBanner = ({
  fromCart,
  product
} : CheckoutBannerProps) => { 

  return (
    <div className='py-4 w-full h-80 flex flex-col justify-between items-center bg-slate-900'>
      <div className='relative px-[15%] w-full flex justify-between items-center'>
        <NavigationItem Icon={RiShoppingCart2Fill} label={`From ${fromCart ? "Cart" : "Shopping"}`}/>
        <NavigationItem Icon={RiWalletFill} label='To Checkout' isSelected={true}/>
        <NavigationItem Icon={HiCash} label='Next Payment'/>
        
        <div className='absolute w-full flex'>
          <div className='absolute -top-3 left-6 w-[65%] h-0.5 bg-green-500 flex'/>
        </div>
      </div>

      <div className='mb-3 w-full flex gap-16 items-start px-24'>
        <div className=' flex-shrink-0'>
          <ReduxProvider>
            <AddressInfo />
          </ReduxProvider>
        </div>

        <ReduxProvider>
          <Total_PlaceOrder 
            product={product}
          />
        </ReduxProvider>
      </div>
    </div>
  )
}
