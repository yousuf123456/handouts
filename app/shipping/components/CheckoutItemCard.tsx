import { Seperator } from '@/app/components/Seperator';
import { FormatedCartItemType } from '@/app/types'
import React from 'react'
import { CheckoutItemProductCard } from './CheckoutItemProductCard';
import { useTotal } from '@/app/hooks/useTotal';
import { FormattedCurrency } from '@/app/components/FormattedCurrency';

interface CheckoutItemCardProps {
    checkoutItem : FormatedCartItemType;
    fromCart : boolean | undefined;
}

export const CheckoutItemCard: React.FC<CheckoutItemCardProps> = ({
    checkoutItem,
    fromCart
}) => {

    const { subTotal } = useTotal(checkoutItem.cartItems);

  return (
    <div className='p-4 w-full bg-white shadow-md'>
        <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
                <p className='text-xs font-text'>
                    By:
                </p>
                <h2 className='text-sm font-text'>
                    { checkoutItem.storeName }
                </h2>
            </div>

            <div className='p-3 w-full bg-slate-100'>
                {
                    <div className='flex flex-col gap-6'>
                        {
                            checkoutItem.cartItems.map((cartItem, i) => (
                                <CheckoutItemProductCard 
                                    key={i}
                                    product={cartItem.product}
                                    quantity={cartItem.quantity}
                                    selectedCombination={cartItem.selectedCombination}
                                />
                            ))
                        }
                    </div>
                }
            </div>

            <Seperator />

            <div className='flex flex-col gap-0'>
                <div className='flex items-center gap-2'>
                    <p className='text-xs font-text text-slate-600'>
                        Shipping Fee:
                    </p>
                    <p className='text-sm font-text'>
                        <FormattedCurrency 
                            quantity={150}
                        />
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='text-xs font-text text-blue-600'>
                        { checkoutItem.cartItems.length + " Item(s) Subtotal:" }
                    </p>
                    <p className='text-sm font-text text-blue-600'>
                        <FormattedCurrency 
                            quantity={subTotal + 150}
                        />
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
