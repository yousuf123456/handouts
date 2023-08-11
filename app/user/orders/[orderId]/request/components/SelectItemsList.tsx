"use client"
import React from 'react'

import { OrderedProductType, PackageType } from '@/app/types'
import { SelectItemCard } from './SelectItemCard'
import { Heading } from './Heading'
import { useAppDispatch } from '@/app/store/store'
import { SelectOptions } from '@/app/components/SelectOptions'
import { setRequestReasonForAll } from '@/app/store/features/orderRequestsSlice'

interface SelectItemsListProps {
    requestType : "Cancellation" | "Return";
    packages : PackageType[];
}

export const SelectItemsList: React.FC<SelectItemsListProps> = ({
    requestType,
    packages,
}) => {
    const reasons = ["Delievery time is too long", "Duplicate Order", "Mistaken Order", "Found cheaper somewhere else"];

    const isPaymentPending = ()=>{
        let isPaymentPending = true;
        packages.map((Package)=>{
            if(Package.status !== "Payment Pending") isPaymentPending = false
        });

        return isPaymentPending
    } 

    const dispatch = useAppDispatch();

    const onChange = (value: string)=> {
        dispatch(setRequestReasonForAll(value))
    }

  return (
    <div className='flex flex-col gap-4'>
        <Heading>
            { requestType === "Cancellation" ? "Select Items to Cancel" : "Select Items to Return"}
        </Heading>

        <div className='flex flex-col gap-2'>
            {
                isPaymentPending() &&
                <div className='flex justify-between items-center'>
                    <p className='text-sm font-text text-red-500'>
                        Please complete the payment process to select the indivisual items to cancel
                    </p>

                    <div className='flex-shrink-0 w-64'>
                        <SelectOptions 
                            label='Reason'
                            options={reasons}
                            onChange={(value)=>onChange(value)}
                            placeHolder='Select A Reason'
                        />
                    </div>
                </div>
            }

            <div className='flex flex-col gap-0'>
                {
                    packages.map((Package)=> {
                        if(!Package.orderedProducts) return;
                        
                        const orderedProducts = Package.orderedProducts as unknown as OrderedProductType[]
                        return orderedProducts.map((orderedProduct, i)=> (
                            <SelectItemCard 
                                key={i}
                                packageId={Package.id}
                                isPaymentPending={isPaymentPending()}
                                orderedProduct={orderedProduct as OrderedProductType}
                            />
                        ))
                    })
                }
            </div>
        </div>
    </div>
  )
}
