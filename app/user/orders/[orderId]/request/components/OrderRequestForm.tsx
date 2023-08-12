import { getOrderById } from '@/app/actions/getOrderById'
import React from 'react'
import { SelectItemsList } from './SelectItemsList';
import { FeedbackForm } from './FeedbackForm';
import { Policies } from './Policies';
import { SubmitRequest } from './SubmitRequest';
import { ReduxProvider } from '@/app/context/ReduxProvider';
import { ProductImagesForm } from './ProductImagesForm';

interface OrderRequestFormProps {
    orderId : string;
    type : "Cancellation" | "Return";
}

export const OrderRequestForm: React.FC<OrderRequestFormProps> = async({
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

            {type === "Return" && <ProductImagesForm />}

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
