import React from 'react'

import { NavigationItem } from '@/app/components/NavigationItem'
import { FaCheckCircle } from "react-icons/fa"
import { HiCash } from 'react-icons/hi'
import { RiWalletFill } from 'react-icons/ri'
import { OrderSummary } from './OrderSummary'

export const PaymentBanner = () => {
  return (
    <div className='px-[15%] h-72 w-full flex flex-col gap-6 justify-center bg-slate-900'>
      <div className='mt-4 flex gap-0 justify-center items-center'>
        <NavigationItem Icon={RiWalletFill} className='bg-purple-600' lineClassName='from-purple-600 to-rose-600' label='From Checkout'/>
        <NavigationItem Icon={HiCash} className='bg-rose-600' lineClassName='from-rose-600 to-green-600' label='To Payment' isSelected={true}/>
        <NavigationItem Icon={FaCheckCircle} className='bg-green-500' label='Next Success' isLast={true}/>
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
