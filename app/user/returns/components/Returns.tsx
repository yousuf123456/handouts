import React from 'react'

import { getUserReturnRequests } from '@/app/actions/getUserReturnRequests';
import { EmptyState } from '../../components/EmptyState';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { Order_OrderRequestCard } from '../../orders/components/Order_OrderRequestCard';
import { ReturnRequestType } from '@/app/types';
import { ReturnRequestCard } from './ReturnRequestCard';

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
          <ReturnRequestCard
            key={i}
            returnRequest={returnRequest as unknown as ReturnRequestType}
          />
        ))
      }
    </div>
  )
}
