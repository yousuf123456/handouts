"use client"
import React from 'react'
import { AddressType } from '../types'

import { RiSuitcaseLine } from "react-icons/ri"
import { Home } from "lucide-react"
import { FormatAddress } from './FormatAddress'

import { twMerge } from "tailwind-merge" 
import clsx from 'clsx'

interface AddressCardProps {
    address : AddressType;
    isSelected? : boolean;
    nonEditable? : boolean;
    hideDefault? : boolean;
    dynamicWidth? : boolean;
    dynamicHeight? : boolean;
    withoutBorder? : boolean;
    onEdit? : (address: AddressType) => void;
    onClick? : (address: AddressType) => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
    onEdit,
    onClick,
    address,
    isSelected,
    hideDefault,
    dynamicWidth,
    withoutBorder,
    dynamicHeight,
    nonEditable,
}) => {

    const handleEdit = (address : AddressType)=> {
        onEdit && onEdit(address);
    }

    const handleSelect = (address: AddressType)=> {
        onClick && onClick(address);
    }

  return (
    <div 
        className={clsx('px-4 py-2 flex flex-col gap-2 transition-all cursor-pointer',
            dynamicWidth ? "max-w-[444px]" : "w-[444px]", 
            dynamicHeight ? "h-fit" : "min-h-[144px]",
            withoutBorder ? "bg-slate-100 py-4": "bg-white shadow-cardShadow rounded-sm",
            isSelected && "shadow-themeBlue"
        )}
        onClick={()=> handleSelect(address)}
    >
        <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    {
                        address.type === "Home" ? (
                            <Home className={twMerge(clsx('w-6 h-6 text-themeSecondary', isSelected && "text-themeBlue"))}/>
                        ):(
                            <RiSuitcaseLine className={twMerge(clsx('w-6 h-6 text-themeSecondary', isSelected && "text-themeBlue"))}/>
                        )
                    }
                    <h3 className={twMerge(clsx('text-base font-text font-semibold text-slate-800', isSelected && "text-themeBlue"))}>
                        { address.type }
                    </h3>
                </div>
                
                {
                    !nonEditable &&
                    <p 
                        className='text-sm font-text font-semibold text-themeBlue transition-all hover:text-blue-300'
                        onClick={()=>handleEdit(address)}
                    >
                        Edit
                    </p>
                }
            </div>

            <div className='flex flex-col gap-0'>
                <p className='text-xs font-text font-semibold text-slate-900'>
                    { address.fullName }
                </p>

                <p className='text-xs font-text font-semibold text-slate-900'>
                    { address.phone }
                </p>
            </div>
        </div>

        <div>
            <FormatAddress 
                rawAddress={address}
                className='text-sm font-text text-black'
            />
        </div>
        
        {
            !hideDefault &&
            <div className='h-full flex gap-2 items-end'>  
                {
                    address.isDefaultShippingAddress && (
                        <div className='w-fit px-1.5 py-0.5 bg-themeBlue rounded-[2px]'>
                            <p className='text-xs font-medium font-text text-white line-clamp-1'>
                                Default Shipping Address
                            </p>
                        </div>
                    )
                }

                {
                    address.isDefaultBillingAddress && (
                        <div className='w-fit px-1.5 py-0.5 bg-themeBlue rounded-[2px]'>
                            <p className='text-xs font-medium font-text text-white line-clamp-1'>
                                Default Billing Address
                            </p>
                        </div>
                    )
                }
            </div>
        }
    </div>
  )
}
