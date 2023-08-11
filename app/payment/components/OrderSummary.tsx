import { FormattedCurrency } from '@/app/components/FormattedCurrency';
import React from 'react'

interface OrderSummaryProps {
    total : number;
    totalQuantity : number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    total,
    totalQuantity
}) => {
  return (
    <div className='p-4 w-80 h-36 shadow-whiteCardShadow rounded-sm'>
        <div className='w-full h-full flex flex-col justify-between'>
            <h1 className='text-lg font-text font-medium text-white'>
                Order Summary
            </h1>

            <div className='w-full flex justify-between'>
                <h3 className='text-xs font-text text-white'>
                    { "Subtotal of " +  totalQuantity + " items included shipping fee" }
                </h3>
                <p className='flex-shrink-0 text-xs font-text text-white'>
                    <FormattedCurrency 
                        quantity={total} 
                    />
                </p>
            </div>

            <div className='w-full flex justify-between'>
                <h3 className='text-base font-text font-semibold text-green-500'>
                    Total Ammount
                </h3>
                <p className='flex-shrink-0 text-base font-text font-semibold text-green-500'>
                    <FormattedCurrency 
                        quantity={total} 
                    />
                </p>
            </div>
        </div>
    </div>
  )
}
