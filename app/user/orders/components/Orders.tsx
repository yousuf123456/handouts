import { Heading } from '@/app/(site)/components/Heading';
import { getUserOrders } from '@/app/actions/getUserOrders';
import React from 'react'
import { OrdersList } from './OrdersList';

export async function Orders(){
  const orders = await getUserOrders();

  return (
    <div className='w-full h-full flex flex-col gap-6'>
      <Heading>
        { "My Orders " + "(" + orders?.length + ")" }
      </Heading>

      <OrdersList 
        orders={orders}
      />
    </div>
  )
}
