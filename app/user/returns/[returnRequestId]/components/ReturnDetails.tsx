import React from 'react'

import { getUserReturnRequests } from '@/app/actions/getUserReturnRequests'
import { Package_RequestProductsCard } from '@/app/user/orders/[orderId]/components/Package_RequestProductsCard'
import { Order_OrderRequestActionPanel } from '@/app/user/orders/components/Order_OrderRequestActionPanel'
import { Timeline } from '@/app/user/orders/components/Timeline'
import { ReturnRequestType } from '@/app/types'
import { ReturnRequestProofs } from '@/app/user/orders/components/ReturnRequestProofs'

interface ReturnDetailsProps {
    returnRequestId : string
}

export const ReturnDetails: React.FC<ReturnDetailsProps> = async({
    returnRequestId
}) => {

    const returnRequest = await getUserReturnRequests({ byId : returnRequestId }) as unknown as ReturnRequestType

    if(!returnRequest) {
        return (
            <p>Sorry no return request with such id was found</p>
        )
    }

  return (
    <div className='flex flex-col gap-0'>
      <Order_OrderRequestActionPanel 
        isOrderRequest={true}
        hideActionButton={true}
        orderId={returnRequest.orderId}
        orderRequestId={returnRequest.id}
        requestedOn={returnRequest.createdAt}
        returnedOn={returnRequest.returnedOn}
        orderRequestStatus={returnRequest.status}
      />

      <Timeline
        isOrderRequest={true}
        orderId={returnRequest.orderId}
      />

      <div className='mt-6'>
        <Package_RequestProductsCard
          orderRequestType="Return"
          isOrderRequest={true}
          request={returnRequest}
        />
      </div>

      <div className='mt-4'>
        <ReturnRequestProofs
          size="large"
          feedback={returnRequest.orderFeedback}
          proofImages={returnRequest.proofImages}
        />
      </div>
    </div>
  )
}
