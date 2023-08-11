"use client"

import { AddressCard } from '@/app/components/AddressCard';
import { Button } from '@/app/components/Button';
import { DialogModel } from '@/app/components/DialogModel'
import { AddressType } from '@/app/types';
import AddAddressFormModel from '@/app/user/addressDiary/components/AddAddressFormModel';
import React, { useEffect, useState } from 'react'

interface EditAddressModelProps {
    title : string;
    open : boolean;
    children : React.ReactNode;
    addressDiary : AddressType[];
    selectedAddress : AddressType | undefined;
    setOpen : React.Dispatch<React.SetStateAction<boolean>>;
    onClick? : (address: AddressType)=> void
}

export default function EditAddressModel({
    title,
    open,
    children,
    addressDiary,
    selectedAddress,
    setOpen,
    onClick
}: EditAddressModelProps){

    const [formModelOpen, setFormModelOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<AddressType>();
    
    const onEdit = (address: AddressType)=> {
        setEditingAddress(address);
        setFormModelOpen(true);
    }

  return (
    <DialogModel 
        open={open}
        title={title}
        setOpen={setOpen}
        trigger={children}
        onOpenChange={()=>setOpen(!open)}
        className='max-w-[720px] h-[500px] overflow-y-auto'
    >
        <div className='w-full h-full flex flex-col gap-6'>
            <div className='mt-8 grid grid-cols-2 gap-4'>
                {
                    addressDiary?.map((address, i)=> (
                        <AddressCard 
                            key={i}
                            onClick={onClick}
                            address={address}
                            dynamicWidth={true}
                            onEdit={()=> onEdit(address)}
                            isSelected={selectedAddress?.address === address.address}
                        />
                    ))
                }
            </div>

            <div className='mt-8 w-full h-full flex items-end justify-between'>
                <AddAddressFormModel 
                    open={formModelOpen}
                    editingAddress={editingAddress}
                    setOpen={setFormModelOpen}
                >
                    <Button onClick={()=> setFormModelOpen((prev)=> !prev)}>
                        Add New Address
                    </Button>
                </AddAddressFormModel>

                <Button onClick={()=> setOpen(false)}>
                    Save
                </Button>
            </div>
        </div>
    </DialogModel>  
    )
}
