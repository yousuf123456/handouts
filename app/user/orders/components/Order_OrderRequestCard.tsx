import React from 'react'

import { CancellationRequestType, OrderType, ReturnRequestType } from '@/app/types'
import { Timeline } from './Timeline'
import { Order_OrderRequestActionPanel } from './Order_OrderRequestActionPanel'
import { OrderRequest_OrderedProductsList } from './OrderRequest_OrderedProductsList'

interface Order_OrderRequestCardProps {
  order? : OrderType,
  isOrderRequest? : boolean,
  orderRequestType? : "Cancellations" | "Returns",
  request? : CancellationRequestType | ReturnRequestType,
}

export const Order_OrderRequestCard: React.FC<Order_OrderRequestCardProps> = ({
  order,
  request,
  isOrderRequest,
  orderRequestType
}) => {

  return (
    <div className='w-full border-b-[2px] border-slate-300 py-6'>
      <div className='w-full flex flex-col gap-0'>
        <Order_OrderRequestActionPanel
          orderId={order?.id}
          orderRequestId={request?.id}
          isOrderRequest={isOrderRequest}
          requestedOn={request?.createdAt}
          status={order?.packages[0].status}
          orderRequestType={orderRequestType}
        />

        <Timeline 
          orderId={request?.orderId}
          createdAt={order?.createdAt}
          isOrderRequest={isOrderRequest}
        />

        <OrderRequest_OrderedProductsList 
          packages={order?.packages}
          isOrderRequest={isOrderRequest}
          orderedProducts={request?.orderedProducts}
        />
      </div>
    </div>
  )
}
