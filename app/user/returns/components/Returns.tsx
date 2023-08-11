import React from 'react'

import { getUserReturnRequests } from '@/app/actions/getUserReturnRequests';
import { EmptyState } from '../../components/EmptyState';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { Order_OrderRequestCard } from '../../orders/components/Order_OrderRequestCard';
import { ReturnRequestType } from '@/app/types';

export const Returns = async() => {
    const returnRequests = await getUserReturnRequests() as unknown as ReturnRequestType[];

    if(!returnRequests || returnRequests.length === 0){
      return (
          <EmptyState
              Icon={RiArrowGoBackFill}
              label='There are no returns yet'
          />
      )
    }

  return (
    <div className='flex flex-col gap-0'>
      {
        returnRequests.map((returnRequest, i)=> (
          <Order_OrderRequestCard
            key={i}
            request={returnRequest as unknown as ReturnRequestType}
            orderRequestType="Returns"
            isOrderRequest={true}
          />
        ))
      }
    </div>
  )
}
