"use client"

import { ReduxProvider } from '@/app/context/ReduxProvider'
import React from 'react'
import TotalTable from '../../components/TotalTable'
import { Button } from '@/app/components/Button'
import { useRouter } from "next/navigation"
import { useAppSelector } from '@/app/store/store'
import { useTotal } from '@/app/hooks/useTotal'
import clsx from 'clsx'

export const Total_Checkout = () => {
    const router = useRouter();
    const onClick = ()=> {
        router.push("/shipping?fromCart=true", { shallow : true })
    }

    const cartItems = useAppSelector(state=> state.cart.cartItems)

    const {subTotal, productsAmmount} = useTotal(cartItems);

  return (
    <>
        <TotalTable 
            subTotal={subTotal}
            productsAmmount={productsAmmount}
            labels={["Sub Total", "Shipping Fee", "Total"]}
            paddingLeft={4}
        />
        <Button 
            onClick={onClick}
            variant={"default"} 
            Disabled={!cartItems.length}
            className={clsx('bg-green-500 text-white', !cartItems.length ? "hover:bg-green-500" : "hover:bg-green-600")}
        >
            Checkout
        </Button>
    </>
  )
}
