import clsx from 'clsx';
import { format } from 'date-fns';
import React from 'react'
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface KeyValuePairInfoProps {
    Key : string;
    value : string | Date | null;
    Icon? : IconType;
    keyClassName? : string;
    valueClassName? : string;
}

export const KeyValuePairInfo:React.FC<KeyValuePairInfoProps> = ({
    Key,
    value,
    Icon,
    keyClassName,
    valueClassName
}) => {

    if(!value) return ;

  return (
    <div className='flex gap-1 items-center'>
        <div className='flex gap-1 items-center'>
            { Icon ? <Icon className='w-4 h-4 text-green-500' /> : null }
            <p className={twMerge(clsx("text-sm text-slate-500", keyClassName))}>
                { Key }
            </p>
        </div>

        { 
            typeof(value) !== "string" ? ( 
                <p className={clsx("text-sm text-black", valueClassName)}>
                    { format(value, "do MMMM Y HH:mm") }
                </p>
            ): (
                <p className={clsx("text-sm font-text text-black", valueClassName)}>
                    { value }
                </p>
            )
        }  
    </div>
  )
}
