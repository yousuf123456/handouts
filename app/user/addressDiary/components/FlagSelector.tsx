"use client" 

import Checkbox from '@mui/material/Checkbox';
import React from 'react'
import { toast } from 'react-hot-toast';

interface FlagSelectorProps {
    flagLabel : string;
    defaultChecked : boolean;
    setFlag : React.Dispatch<React.SetStateAction<boolean>>
}

export const FlagSelector: React.FC<FlagSelectorProps> = ({
    flagLabel,
    defaultChecked,
    setFlag
}) => {

    const handleClick = (e: any)=> {
        if (defaultChecked) return toast.error("If you wish to change it's default setting, you'll need to set any other address to default.");
        
        if(e.target.checked) setFlag(true);
        else setFlag(false)
    }

  return (
    <div className='w-full flex justify-between items-center'>
        <p className='text-sm font-text line-clamp-1'>
            { flagLabel }
        </p>

        <Checkbox 
            size='small' 
            onClick={handleClick}
            // defaultChecked={defaultChecked ? true : undefined} 
            checked={defaultChecked ? true : undefined}
        />
    </div>
  )
}
