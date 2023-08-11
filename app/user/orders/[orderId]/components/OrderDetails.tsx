import React from 'react'

import { getOrderById } from '@/app/actions/getOrderById';
import { Order_OrderRequestActionPanel } from '../../components/Order_OrderRequestActionPanel';
import { Timeline } from '../../components/Timeline';
import { AddressType, OrderedProductType, StatusType } from '@/app/types';
import { PackagesList } from './PackagesList';
import { OrderAddresses } from './OrderAddresses';
import { OrderSummary } from './OrderSummary';

interface OrderDetailsProps {
    orderId : string;
}

export const OrderDetails: React.FC<OrderDetailsProps> = async ({
    orderId
}) => {

    const order = await getOrderById(orderId);
    if(!order){
        return (
            <p>Sorry No Order with Such Id Was Found</p>
        )
    }

  return (
    <div className='flex flex-col gap-0'>
        <Order_OrderRequestActionPanel 
            showTotal={true}
            orderId={order.id}
            status={order.packages[0].status}
            total={order.totalAmmount}
        />

        <Timeline
            createdAt={order.createdAt} 
        />

        <PackagesList 
            packages={order.packages}
        />

        <div className='mt-6 flex justify-between items-start gap-8'>
            <OrderAddresses 
                shippingAddress={order.shippingAddress as AddressType}
                billingAddress={order.billingAddress as AddressType}
            />

            <OrderSummary
                total={order.totalAmmount}
            />
        </div>
    </div>
  )
}
