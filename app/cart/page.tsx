
import React from 'react'
import { CartBanner } from './components/CartBanner'
import { CartItems } from './components/CartItems'
import { ReduxProvider } from '../context/ReduxProvider'

export default function CartPage() {
  return (
    <div className='min-h-[360px] pb-12 w-full flex flex-col bg-white'>
      <CartBanner />

      <div className='flex'>
        <ReduxProvider>
          <CartItems />
        </ReduxProvider>
      </div>
    </div>
  )
}
