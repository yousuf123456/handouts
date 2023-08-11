import React from 'react'

import { NavigationItem } from '@/app/components/NavigationItem'
import { FaCheckCircle } from "react-icons/fa"
import { HiCash } from 'react-icons/hi'
import { RiWalletFill } from 'react-icons/ri'
import { OrderSummary } from './OrderSummary'

export const PaymentBanner = () => {
  return (
    <div className='px-[15%] h-72 w-full flex flex-col gap-6 justify-center bg-slate-900'>
      <div className='mt-4 relative w-full flex justify-between items-center'>
        <NavigationItem Icon={RiWalletFill} label='From Checkout'/>
        <NavigationItem Icon={HiCash} label='To Payment' isSelected={true}/>
        <NavigationItem Icon={FaCheckCircle} label='Next Success'/>
        
        <div className='absolute w-full flex justify-center'>
            <div className='absolute -top-3 w-[91%] h-0.5 bg-green-500 flex'/>
        </div>
      </div>

      <div className='w-full flex justify-center'>
        <OrderSummary 
          total={1300}
          totalQuantity={5}
        />
      </div>
    </div>
  )
}
