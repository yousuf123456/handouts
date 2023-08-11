import { CtaLink } from '@/app/(site)/components/CtaLink';
import { Button } from '@/app/components/Button';
import { FormattedCurrency } from '@/app/components/FormattedCurrency';
import { format } from 'date-fns';
import React from 'react'
import { FaCrosshairs } from 'react-icons/fa';
import { KeyValuePairInfo } from './KeyValuePairInfo';

interface Order_OrderRequestActionPanelProps {
    total? : number;
    status? : string;
    orderId? : string;
    requestedOn? : Date;
    showTotal? : boolean;
    orderRequestId? : string;
    isOrderRequest? : boolean;
    cancelledOn? : Date | null;
    returnedOn? : Date | null;
    hideActionButton? : boolean;
    orderRequestStatus? : string;
    orderRequestType? : "Cancellations" | "Returns",
}

export const Order_OrderRequestActionPanel: React.FC<Order_OrderRequestActionPanelProps> = ({
    orderRequestStatus,
    hideActionButton,
    orderRequestType,
    orderRequestId,
    isOrderRequest,
    cancelledOn,
    requestedOn,
    returnedOn,
    showTotal,
    orderId,
    status,
    total
}) => {
    const href = isOrderRequest ? `/user/${orderRequestType?.toLowerCase()}/${orderRequestId}` : `/user/orders/${orderId}`

    const isCancelled = orderRequestStatus === "Cancelled";
    const isReturned = orderRequestStatus === "Returned";

  return (
    <div className='flex justify-between items-center'>
        <CtaLink href={href}>
            <h2 className='text-lg font-heading font-semibold text-slate-900'>
                { 
                    isOrderRequest 
                    ? <KeyValuePairInfo 
                        Key={isCancelled ? "Cancelled On : " : (isReturned ? "Returned On" : "Requested On : ")} 
                        value={cancelledOn || returnedOn || requestedOn || null} 
                        keyClassName='text-base'
                        valueClassName='text-base'
                    />  
                    : "Order ID: " + orderId 
                }
            </h2>
        </CtaLink>
        
        {
            showTotal ? (
                <div className='mr-12 flex flex-col gap-0 items-start'>
                    <p className='text-sm font-text text-slate-500'>
                        Total
                    </p>

                    <h3 className='text-lg font-text font-semibold text-slate-800'>
                        {
                            total &&
                            <FormattedCurrency 
                                quantity={total}
                            />
                        }
                    </h3>
                </div>
            ): (
            <div className='flex gap-3'>
                {
                    status === "Payment Pending" &&
                    <Button className='bg-green-100 text-green-500 hover:bg-green-100 hover:text-green-500 font-semibold'>
                        Pay Now
                    </Button>
                }
                {
                    !hideActionButton &&
                    <CtaLink href={href}>
                        <Button className='flex justify-center items-center gap-2'>
                            { isOrderRequest ? "More Details" : "Track Order" }
                            { !isOrderRequest && <FaCrosshairs className='w-4 h-4 text-white' /> }
                        </Button>
                    </CtaLink>
                }
            </div>
            )
        }
    </div>
  )
}
