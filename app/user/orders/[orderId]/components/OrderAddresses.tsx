import { AddressCard } from '@/app/components/AddressCard';
import { AddressType } from '@/app/types'
import { truncateSync } from 'fs';
import React from 'react'
import { OrderAddressCard } from './OrderAddressCard';

interface OrderAddressesProps {
  shippingAddress : AddressType;
  billingAddress : AddressType; 
}

export const OrderAddresses: React.FC<OrderAddressesProps> = ({
  billingAddress,
  shippingAddress
}) => {
  return (
    <div className='flex flex-col gap-4 items-start'>
      <OrderAddressCard 
        address={shippingAddress}
        heading='Shipping Address'
      />

      <OrderAddressCard 
        address={billingAddress}
        heading='Billing Address'
      />
    </div>
  )
}
