import React from 'react'

import { Heading } from '@/app/(site)/components/Heading';
import { getUserOrders } from '@/app/actions/getUserOrders';
import { OrdersList } from './OrdersList';
import { PaginationControl } from '../../components/PaginationControl';
import { OrderType } from '@/app/types';

interface OrdersProps {
  cursor : string | undefined;
  prevPage : number | undefined;
  pageNumber : number | undefined;
}

export async function Orders({ pageNumber, prevPage,cursor }: OrdersProps){
  const {
    orders,
    count
  } = await getUserOrders({ page : pageNumber, prevPage : prevPage, cursor : cursor });

  const getLastOrder = ()=> {
    if(orders) return orders[orders.length - 1]
    else return null
  }

  const getFirstOrder = ()=> {
    if(orders) return orders[0]
    else return null
  }

  return (
    <div className='w-full h-full flex flex-col gap-6'>
      <Heading>
        { "My Orders " + "(" + count + ")" }
      </Heading>

      <OrdersList 
        orders={orders}
      />

      <PaginationControl 
        pageNumber={pageNumber}
        //@ts-ignore
        lastOrderId={getLastOrder()?.id || undefined}
        firstOrderId={getFirstOrder()?.id || undefined}
      />
    </div>
  )
}
