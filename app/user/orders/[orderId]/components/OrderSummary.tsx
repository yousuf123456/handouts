import React from 'react'
import { OrderSummaryInfo } from './OrderSummaryInfo';

interface OrderSummaryProps {
    total : number;
} 

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    total
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <h3 className='font-text text-black'>
        Order Summary
      </h3>

      <div className='p-4 flex flex-col gap-4 bg-slate-100'>
        <OrderSummaryInfo
          Key='Subtotal'
          value={total}
          isTotal={false}
        />

        <OrderSummaryInfo
          Key='Delievery'
          value={150}
          isTotal={false}
        />

        <OrderSummaryInfo
          Key='Total'
          value={total + 150}
          isTotal={true}
        />
      </div>
    </div>
  )
}
