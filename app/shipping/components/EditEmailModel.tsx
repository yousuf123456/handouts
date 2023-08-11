"use client"
import { Button } from '@/app/components/Button';
import { DialogModel } from '@/app/components/DialogModel';
import { input2Styling } from '@/app/components/Input2';
import { validateEmail } from '@/app/utils/validateEmail';
import { DialogClose } from '@radix-ui/react-dialog';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'

interface EditEmailModelProps {
    email : string | null | undefined;
    onSave : (newEmail: string | null | undefined)=> void;
    children : React.ReactNode
}

export const EditEmailModel: React.FC<EditEmailModelProps> = ({
    email,
    onSave,
    children
}) => {

    const [newEmail, setNewEmail] = useState(email);

    useEffect(()=> {
        setNewEmail(email)
    }, [email])
  return (
    <DialogModel
        title='Change Email Address'
        trigger={children}
    >
        <div className='mt-6 w-full flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
                <input 
                    value={newEmail ? newEmail : ""}
                    onChange={(e)=> setNewEmail(e.target.value)}
                    className={clsx(
                        input2Styling,
                        newEmail?.length ? "ring-2 ring-green-400 bg-white" : "bg-slate-100 focus-visible:ring-2 focus-visible:ring-green-400"
                    )}
                />

                {
                    !validateEmail(newEmail) && (
                        <p className='text-sm font-text text-rose-500'>
                            Please enter valid email address
                        </p>
                    )
                }
            </div>

            <DialogClose className='w-full'>
                <Button 
                    Disabled={!validateEmail(newEmail)} 
                    className='w-full'
                    onClick={()=>onSave(newEmail)}
                >
                    Save
                </Button>
            </DialogClose>
        </div>
    </DialogModel>
  )
}
