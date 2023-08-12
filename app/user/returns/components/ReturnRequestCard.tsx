import React from 'react'

import { ReturnRequestType } from '@/app/types'
import { Order_OrderRequestCard } from '../../orders/components/Order_OrderRequestCard';
import Image from 'next/image';

interface ReturnRequestCardProps {
    returnRequest : ReturnRequestType;
}

export const ReturnRequestCard: React.FC<ReturnRequestCardProps> = ({
    returnRequest
}) => {
  return (
    <Order_OrderRequestCard
      request={returnRequest}
      orderRequestType="Returns"
      isOrderRequest={true}
    />
  )
}
