import React from 'react'

import { OrderedProductType } from '@/app/types'
import { OrderRequest_OrderedProductCard } from '../../../components/OrderRequest_OrderedProductCard'

interface RequestedItemsProps {
    orderedProducts : OrderedProductType[];
    process : "pending" | "completed";
}

export const RequestedItems: React.FC<RequestedItemsProps> = ({
    orderedProducts,
    process
}) => {
  return (
    <div className='flex flex-col gap-4 items-center'>
        <h3 className='text-base font-text font-semibold text-slate-700'>
            {process === "completed" ? "Cancelled Items (" + orderedProducts.length + ")" : "Requested Items (" + orderedProducts.length + ")"}
        </h3>

        {
            orderedProducts.map((orderedProduct, i)=> (
                <OrderRequest_OrderedProductCard
                    key={i}
                    hidePrice={true}
                    hideStatus={true}
                    orderedProduct={orderedProduct}
                />
            ))
        }
    </div>
  )
}
