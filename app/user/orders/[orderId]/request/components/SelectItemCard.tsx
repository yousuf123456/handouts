"use client"
import React, { useEffect, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import { OrderedProductType } from '@/app/types'
import { SelectOptions } from '@/app/components/SelectOptions'
import { useAppDispatch } from '@/app/store/store'
import { OrderRequest_OrderedProductCard } from '../../../components/OrderRequest_OrderedProductCard'
import { selectOrderedProduct, setRequestReason, unselectOrderedProduct } from '@/app/store/features/orderRequestsSlice'

interface SelectItemCardProps {
    orderedProduct : OrderedProductType;
    isPaymentPending : boolean; 
    packageId : string;
}

export const SelectItemCard: React.FC<SelectItemCardProps> = ({
    isPaymentPending,
    orderedProduct,
    packageId
}) => {

    const [selectedReason, setSelectedReason] = useState("");

    const reasons = ["Delievery time is too long", "Duplicate Order", "Mistaken Order", "Found cheaper somewhere else"];
    const dispatch = useAppDispatch();

    useEffect(()=> {
        if(isPaymentPending){
            const data = {
                packageId : packageId,
                orderedProductId : orderedProduct.id,
                reason : selectedReason
            }
            dispatch(selectOrderedProduct(data))
        }
    }, [isPaymentPending])

    const onCheckBoxClicked = (e: any)=> {
        if(isPaymentPending) return ;

        const data = {
            packageId : packageId,
            orderedProductId : orderedProduct.id,
            reason : selectedReason
        }

        if(e.target.checked) dispatch(selectOrderedProduct(data));
        else dispatch(unselectOrderedProduct(data));
    } 

    const onChange = (value: any)=> {
        setSelectedReason(value);
    }

    useEffect(()=> {
        const data = {
            packageId : packageId,
            orderedProductId : orderedProduct.id,
            reason : selectedReason
        }

        dispatch(setRequestReason(data))
    }, [selectedReason])

  return (
    <div className='py-2 w-full border-b-[2px] border-slate-200'>
        <div className='flex gap-6 items-start'>
            <Checkbox
                size='medium'
                checked={isPaymentPending ? true : undefined}
                disabled={isPaymentPending}
                onClick={(e)=>onCheckBoxClicked(e)}
            />

            <div className='w-full'>
                <OrderRequest_OrderedProductCard 
                    orderedProduct={orderedProduct}
                    showOnlyCancelStatus={true}
                    hidePrice={true}
                />
            </div>

            <div className='flex-shrink-0 w-64'>
                <SelectOptions 
                    label='Reason'
                    options={reasons}
                    disabled={isPaymentPending}
                    onChange={onChange}
                    placeHolder='Select A Reason'
                />
            </div>
        </div>
    </div>
  )
}
