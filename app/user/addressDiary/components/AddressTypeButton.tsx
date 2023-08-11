import clsx from 'clsx';
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';

interface AddressTypeButtonProps {
    label : string;
    isSelected : boolean;
    onClick : ()=> void;
}

export const AddressTypeButton: React.FC<AddressTypeButtonProps> = ({
    label,
    isSelected,
    onClick
}) => {
  return (
    <div onClick={onClick} className={clsx('px-2 h-[38px] w-full flex justify-between items-center bg-transparent border-[2px] rounded-sm cursor-pointer', isSelected && "border-green-400")}>
        <p className='text-sm text-black font-text'>
            { label }
        </p>

        {
            isSelected && (
                <FaCheckCircle className='w-4 h-4 text-green-400' />
            )
        }
    </div>
  )
}

