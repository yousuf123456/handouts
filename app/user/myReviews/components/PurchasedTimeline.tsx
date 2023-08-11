import React from 'react'
import { KeyValuePairInfo } from '../../orders/components/KeyValuePairInfo'

import { HiClock } from "react-icons/hi"

interface PurchasedTimelineProps {
  purchasedAt : Date
}

export const PurchasedTimeline: React.FC<PurchasedTimelineProps> = ({
  purchasedAt
}) => {
  return (
    <KeyValuePairInfo
      Key="Purchased on"
      value={purchasedAt}
      keyClassName='text-green-500 font-medium'
      valueClassName='text-green-500 font-medium'
      Icon={HiClock}
    />
  )
}
