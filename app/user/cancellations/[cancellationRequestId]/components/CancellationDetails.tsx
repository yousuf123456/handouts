import { getUserCancellationRequests } from '@/app/actions/getUserCancellationRequests';
import { CancellationRequestType } from '@/app/types';
import { Package_RequestProductsCard } from '@/app/user/orders/[orderId]/components/Package_RequestProductsCard';
import { Order_OrderRequestActionPanel } from '@/app/user/orders/components/Order_OrderRequestActionPanel';
import { Timeline } from '@/app/user/orders/components/Timeline';
import React from 'react'

interface CancellationDetailsProps {
    cancellationRequestId : string;
}

export const CancellationDetails: React.FC<CancellationDetailsProps> = async({
    cancellationRequestId
}) => {
  const cancellationRequest = await getUserCancellationRequests({ byId : true, cancellationRequestId : cancellationRequestId }) as unknown as CancellationRequestType;

  return (
    <div className='flex flex-col gap-0'>
      <Order_OrderRequestActionPanel 
        isOrderRequest={true}
        hideActionButton={true}
        orderId={cancellationRequest.orderId}
        orderRequestId={cancellationRequest.id}
        requestedOn={cancellationRequest.createdAt}
        cancelledOn={cancellationRequest.cancelledOn}
        orderRequestStatus={cancellationRequest.status}
      />

      <Timeline
        isOrderRequest={true}
        orderId={cancellationRequest.orderId}
      />

      <div className='mt-6'>
        <Package_RequestProductsCard
          orderRequestType="Cancellation"
          request={cancellationRequest}
          isOrderRequest={true}
        />
      </div>
    </div>
  )
}
