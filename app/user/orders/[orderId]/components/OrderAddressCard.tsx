import { AddressCard } from '@/app/components/AddressCard';
import { AddressType } from '@/app/types'
import React from 'react'

interface OrderAddressCardProps {
    address : AddressType;
    heading : string;
}

export const OrderAddressCard: React.FC<OrderAddressCardProps>= ({
    address,
    heading
}) => {
  return (
    <div className=' flex flex-col gap-1'>
        <h3 className='font-text text-black'>
            { heading }
        </h3>
        <AddressCard
            address={address}
            dynamicHeight={true}
            withoutBorder={true}
            hideDefault={true}
            nonEditable={true}
        />
    </div>
  )
}
