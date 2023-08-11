import React from 'react'
import { getCheckoutOrder } from '../actions/getCheckoutOrder';
import { PaymentBanner } from './components/PaymentBanner';
import { PaymentOptions } from './components/PaymentOptions';

interface IParams {
    checkoutOrderId : string
}

export default async function PaymentPage({ searchParams } : { searchParams : IParams }) {
    const order = await getCheckoutOrder(searchParams.checkoutOrderId);
    
  return (
    <div className='bg-slate-200 flex flex-col gap-0'>
        <PaymentBanner />

        <PaymentOptions />
    </div>
  )
}
