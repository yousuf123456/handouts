"use client";

import React, { useState } from 'react'
import { PaymentOptionCard } from './PaymentOptionCard'
import { Heading } from '@/app/(site)/components/Heading';

type PaymentMethods = "EasyPaisa" | "Jazzcash" | "Credit/Debit Card" | "Cash on Delievery"

export const PaymentOptions = () => {

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethods>();

    const paymentOptions : {label: PaymentMethods, image : string}[] = [
        {
            label : "EasyPaisa",
            image : "/logos/EasyPaisaLogo.png"
        },
        {
            label : "Jazzcash",
            image : "/logos/JazzcashLogo.png"
        },
        {
            label : "Credit/Debit Card",
            image : "/logos/CreditCardLogo.png"
        },
        {
            label : "Cash on Delievery",
            image : "/logos/CashOnDelieveryLogo.png"
        }
    ]

  return (
    <div className='py-8 px-48 flex flex-col gap-6'>
        <Heading>
            Select a Payment Method
        </Heading>
        <div className='flex justify-between'>
            {
                paymentOptions.map((paymentOption, i)=> (
                    <PaymentOptionCard
                        key={i}
                        label={paymentOption.label}
                        image={paymentOption.image} 
                        isSelected={selectedPaymentMethod === paymentOption.label}
                        onClick={()=> setSelectedPaymentMethod(paymentOption.label)}
                    />
                ))
            }
        </div>
    </div>
  )
}
