"use client";
import React, { useEffect, useState } from 'react'

import { Button } from '@/app/components/Button';
import { FormatAddress } from '@/app/components/FormatAddress';
import { AddressType } from '@/app/types'
import { Prisma } from '@prisma/client';

import { EditEmailModel } from './EditEmailModel';
import { useAppDispatch, useAppSelector } from '@/app/store/store';

import { setSelectedBillingAddress, setSelectedShippingAddress, setEmail } from "../../store/features/shippingSlice"

import dynamic from "next/dynamic"
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { setAddressDiary, setHasBeenFetched } from '@/app/store/features/addressDiarySlice';
import clsx from 'clsx';
import { SpinnerLoader } from '@/app/components/SpinnerLoader';
const EditAddressModel = dynamic(()=> import("./EditAddressModel"));

interface AddressInfoProps {

}

export const AddressInfo: React.FC<AddressInfoProps> = ({

}) => {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const hasBeenFetched = useAppSelector(state=> state.addressDiary.hasBeenFetched);

    useEffect(()=> {
        if(!hasBeenFetched){
            setIsLoading(true);
            axios.post("../../api/getAddressDiary")
            .then((res)=> {
                dispatch(setHasBeenFetched(true));
                dispatch(setAddressDiary(res.data.addressDiary));
            })
            .catch((e) => console.log(e))
            .finally(()=> setIsLoading(false))
        }
    }, [hasBeenFetched])

    const [delieveryAddressesOpen, setDelieveryAddressesOpen] = useState(false);
    const [billingAddressesOpen, setBillingAddressesOpen] = useState(false);

    const addresses = useAppSelector(state=> state.addressDiary.addressDiary);
    const session = useSession();
    const noAddressIsHere = addresses?.length === 0;

    const defaultShippingAddress = addresses?.filter((address)=> address.isDefaultShippingAddress);
    const defaultBillingAddress = addresses?.filter((address)=> address.isDefaultBillingAddress);

    useEffect(()=> {
        dispatch(setSelectedShippingAddress(defaultShippingAddress?.length ? defaultShippingAddress[0] : undefined));
        dispatch(setSelectedBillingAddress(defaultBillingAddress?.length ? defaultBillingAddress[0] : undefined));
        dispatch(setEmail(session.data?.user?.email));
    }, [addresses])

    const selectedShippingAddress = useAppSelector(state=> state.shipping.selectedShippingAddress);
    const selectedBillingAddress = useAppSelector(state=> state.shipping.selectedBillingAddress);
    const email = useAppSelector(state=> state.shipping.email);

    const billingLabel = ()=> {
        const className = "text-xs font-text text-white line-clamp-1"
        if(selectedBillingAddress?.address === selectedShippingAddress?.address) return <p className={className}>Bill to the same address</p>
        if(selectedBillingAddress?.isDefaultBillingAddress) return <p className={className}>Bill to the default billing address</p>
        
        return <FormatAddress rawAddress={selectedBillingAddress} className={className} prefix='Bill to the ' />
    }
    const emailToLabel = email ? "Email to " + email : "Enter your email to get order updates";

    const editClassName = "text-xs font-text text-green-500 cursor-pointer transition-all hover:opacity-60"

    if(noAddressIsHere || isLoading || session.status === "loading"){
        const loading = isLoading || session.status === "loading"
        return (
            <div className={clsx(!loading && 'h-36 w-[460px] flex items-center justify-center')}>
                {
                    loading ? (
                        <SpinnerLoader 
                            className='pt-0 mt-0 h-36 w-[460px] flex justify-center items-center rounded-sm shadow-whiteCardShadow'
                            color='white'
                            size='1.5rem'
                        />
                    ):(
                        <Button className='bg-white text-slate-900 font-semibold hover:bg-white hover:text-slate-900 hover:bg-opacity-80'>
                            Add New Address
                        </Button>
                    )
                }
            </div>
        )
    }
  return (
    <>
    <div className='w-[460px] h-36 rounded-sm shadow-whiteCardShadow'>
        <div className='p-3 w-full h-full flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
                <h3 className='text-xs font-text text-white'>
                    { "Deliever To :  " + selectedShippingAddress?.fullName}
                </h3>

                <EditAddressModel
                    title='Delievery Address'
                    open={delieveryAddressesOpen}
                    setOpen={setDelieveryAddressesOpen}
                    addressDiary={addresses}
                    selectedAddress={selectedShippingAddress}
                    onClick={(address)=> dispatch(setSelectedShippingAddress(address))}
                >
                    <p className={editClassName}>
                        Change
                    </p>
                </EditAddressModel>
            </div>

            <div className='flex gap-2 items-center'>
                <div className='px-1 py-0.5 bg-white rounded-[2px]'>
                    <p className='text-xs font-text text-black'>{ selectedShippingAddress?.type }</p>
                </div>

                <p className='text-xs font-text text-white'>{ selectedShippingAddress?.phone }</p>

                <p className='text-white'>|</p>

                <FormatAddress
                    rawAddress={selectedShippingAddress}
                    className='text-xs font-text text-white line-clamp-3'
                />
            </div>
        
            <div className='flex flex-col gap-1'>
                <div className='flex justify-between items-center'>
                    { billingLabel() }
                    <EditAddressModel
                        title='Billing Address'
                        open={billingAddressesOpen}
                        setOpen={setBillingAddressesOpen}
                        addressDiary={addresses}
                        selectedAddress={selectedBillingAddress}
                        onClick={(address)=> dispatch(setSelectedBillingAddress(address))}
                    >
                        <p className={editClassName}>
                            Edit
                        </p>
                    </EditAddressModel>
                </div>

                <div className='flex justify-between items-center'>
                    <p className='text-xs font-text text-white'>
                        { emailToLabel }
                    </p>

                    <EditEmailModel 
                        email={email}
                        onSave={(newEmail: string | null | undefined)=> dispatch(setEmail(newEmail))}
                    >
                        <p className={editClassName}>
                            Edit
                        </p>
                    </EditEmailModel>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
