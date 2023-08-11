import { OrderType } from '@/app/types'
import React from 'react'
import { Order_OrderRequestCard } from './Order_OrderRequestCard'
import { EmptyState } from '../../components/EmptyState'
import { HiTruck } from 'react-icons/hi'

interface OrdersListProps {
  orders : OrderType[] | null
}

export const OrdersList: React.FC<OrdersListProps> = ({
  orders
}) => {

  if(!orders) {
    return (
      <div className='w-full h-full'>
        <EmptyState 
          Icon={HiTruck}
          label='There are no orders placed yet'
        />
      </div>
    )
  }

  return (
    <div className='w-full flex flex-col gap-0'>
      {
        orders?.map((order)=> (
          <Order_OrderRequestCard 
            key={order.id}
            order={order}
          />
        ))
      }
    </div>
  )
}
