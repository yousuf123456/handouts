import React from 'react'
import clsx from "clsx"
import { IconType } from 'react-icons';


interface NavigationItemProps {
    label : string;
    Icon : IconType;
    isSelected? : boolean
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
    label,
    Icon,
    isSelected
}) => {
  return (
    <div className='flex flex-col items-center gap-1'>
        <div className={clsx("p-2 rounded-full bg-green-500 flex justify-center items-center z-[99]", isSelected && "p-3")}>
            <Icon className={clsx('w-6 h-6 text-white', isSelected && "w-7 h-7")}/>
        </div>
        <p className={clsx("text-xs font-text font-medium tracking-wide text-white")}>
            {  label }
        </p>
    </div>
  )
}
