import React, { ReactNode } from 'react'

import { DialogModel } from './DialogModel';
import { Button } from './Button';

interface Alert_DialogModelProps {
  title : string;
  desc : string;
  open : boolean;
  onOpenChange? : any;
  action? : ReactNode;
  setOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

export const Alert_DialogModel: React.FC<Alert_DialogModelProps> = ({
  title,
  desc,
  open,
  action,
  onOpenChange,
  setOpen
}) => {
  return (
    <DialogModel
      title={title}
      open={open}
      setOpen={setOpen}
      onOpenChange={onOpenChange ? onOpenChange : ()=> open && setOpen(false)}
    >
      <div className='w-full h-full flex flex-col gap-6'>
        { desc }

        <div className='w-full flex justify-end gap-3'>
          <Button 
            type='button'
            onClick={onOpenChange ? onOpenChange : ()=> open && setOpen(false)} 
            className='bg-transparent border-[1px] border-slate-300 hover:bg-slate-100 hover:text-black text-black'
          >
            Close
          </Button>
          { action }
        </div>
      </div>
    </DialogModel>
  )
}
