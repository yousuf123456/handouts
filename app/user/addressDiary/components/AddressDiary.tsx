"use client"
import React, { useEffect, useState } from 'react'

import { Heading } from '@/app/(site)/components/Heading'

import { Prisma } from '@prisma/client'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { EmptyState } from '../../components/EmptyState'

import AddAddressFormModel from '../components/AddAddressFormModel'
import { AddressType } from '@/app/types'
import { AddressCard } from '@/app/components/AddressCard'
import { Button } from '@/app/components/Button'
import { HiPlus } from 'react-icons/hi'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import axios from 'axios'
import { setAddressDiary, setHasBeenFetched } from '@/app/store/features/addressDiarySlice'
import { SpinnerLoader } from '@/app/components/SpinnerLoader'

interface AddressDiaryProps {

}

export const AddressDiary: React.FC<AddressDiaryProps> = ({

}) => {

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const hasBeenFetched = useAppSelector(state=> state.addressDiary.hasBeenFetched);

  useEffect(()=> {  
    if(!hasBeenFetched){
      setIsLoading(true);
      axios.post("../../../api/getAddressDiary")
      .then((res)=> {
        dispatch(setHasBeenFetched(true));
        dispatch(setAddressDiary(res.data?.addressDiary));
      })

      .catch((e)=> console.log(e))
      .finally(()=> setIsLoading(false))
    }
  }, [hasBeenFetched])

  const [open, setOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressType>();

  const addressesArray = useAppSelector(state=> state.addressDiary.addressDiary);
  const noAddressIsHere = addressesArray?.length === 0;

  const onEdit = (address: AddressType)=> {
    setEditingAddress(address);
    setOpen(true);
  }

  return (
    <>
    <div className='w-full h-full flex flex-col gap-12'>
      <div className='relative w-full flex justify-between items-center'>
        <Heading>
          Address Diary
        </Heading>

        <AddAddressFormModel 
          open={open}
          setOpen={setOpen}
          editingAddress={editingAddress}
        >
          <Button 
            variant={"outline"}
            onClick={()=> {
              setEditingAddress(undefined);
              setOpen((prev)=> !prev)
            }}
            className='absolute right-1 top-0 flex items-center gap-3'
          >
            <HiPlus className='w-5 h-5' />
            Add New Address
          </Button>
        </AddAddressFormModel>
      </div>

      <div className='w-full h-full'>
        {
          isLoading ? (
            <SpinnerLoader 
              className='pt-0 mt-0 w-full h-full flex justify-center items-center'
            />
          ):

          !addressesArray || noAddressIsHere ? (
            <EmptyState 
              Icon={FaMapMarkerAlt}
              label='no addresses in your address diary'
            />
          ):
          (
            <div className='grid grid-cols-2 gap-6'>
              {
                addressesArray.map((address, i)=> (
                  <AddressCard 
                    key={i}
                    address={address}
                    onEdit={onEdit}
                  />
                ))
              }
            </div>
          )
        }
      </div>
    </div>
    </>
  )
}
