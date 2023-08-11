import { getOrderById } from '@/app/actions/getOrderById'
import React from 'react'
import { SelectItemsList } from './SelectItemsList';
import { FeedbackForm } from './FeedbackForm';
import { Policies } from './Policies';
import { SubmitRequest } from './SubmitRequest';
import { ReduxProvider } from '@/app/context/ReduxProvider';

interface OrderCancellationFormProps {
    orderId : string;
    type : "Cancellation" | "Return";
}

export const OrderCancellationForm: React.FC<OrderCancellationFormProps> = async({
    orderId,
    type
}) => {

    const order = await getOrderById(orderId);

    if(!order){
        return (
            <p>
                Sorry order was not found
            </p>
        )
    }

  return (
    <div className='flex flex-col gap-8'>
        <ReduxProvider>
            <SelectItemsList
                requestType={type}
                packages={order.packages}
            />

            <FeedbackForm />

            <Policies />

            <SubmitRequest 
                type={type}
                orderId={orderId}
                packages={order.packages}
            />
        </ReduxProvider>
    </div>
  )
}
