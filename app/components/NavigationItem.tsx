import React from 'react'
import clsx from "clsx"
import { IconType } from 'react-icons';


interface NavigationItemProps {
    label : string;
    Icon : IconType;
    isLast? : boolean;
    className? : string;
    isSelected? : boolean;
    lineClassName? : string;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
    Icon,
    label,
    isLast,
    className,
    isSelected,
    lineClassName
}) => {
  return (
    <div className='flex items-center gap-0'>
        <div className={clsx("relative p-2 rounded-full flex justify-center items-center z-[99]", isSelected && "p-3", className)}>
            <Icon className={clsx('w-6 h-6 text-white', isSelected && "w-7 h-7")}/>

            <p className={clsx("absolute left-1/2 -translate-x-1/2 -bottom-6 w-36 flex justify-center text-xs font-text font-medium tracking-wide text-white")}>
                {  label }
            </p>
        </div>

        {!isLast && <div className={clsx('w-96 h-[2px] bg-gradient-to-r', lineClassName)}/>}
    </div>
  )
}
