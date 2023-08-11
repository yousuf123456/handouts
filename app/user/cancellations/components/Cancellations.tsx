import React from 'react'

import { getUserCancellationRequests } from '@/app/actions/getUserCancellationRequests';
import { EmptyState } from '../../components/EmptyState';
import { FaTimes } from 'react-icons/fa';
import { Order_OrderRequestCard } from '../../orders/components/Order_OrderRequestCard';
import { CancellationRequestType } from '@/app/types';

export const Cancellations = async() => {
  const cancellationRequests = await getUserCancellationRequests() as unknown as CancellationRequestType[]; 

  if(!cancellationRequests){
    return (
      <EmptyState
        Icon={FaTimes}
        label='There are no cancellations yet'
      />
    )
  }

  return (
    <div className='flex flex-col gap-0'>
      {
        cancellationRequests.map((cancellationRequest, i)=> (
          <Order_OrderRequestCard
            key={i}
            request={cancellationRequest as CancellationRequestType}
            orderRequestType="Cancellations"
            isOrderRequest={true} 
          />
        ))
      }
    </div>
  )
}
