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
            <Icon className={clsx('w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-6 md:h-6 text-white', isSelected && "w-[22px] h-[22px] sm:w-6 sm:h-6 md:w-7 md:h-7")}/>

            <p className={clsx("text-[10px] sm:text-xs absolute left-1/2 -translate-x-1/2 -bottom-6 w-[92px] sm:w-32 flex justify-center font-text font-medium tracking-wide text-white")}>
                {  label }
            </p>
        </div>

        {!isLast && <div className={clsx('w-24 min-[400px]:w-28 min-[460px]:w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-[2px] bg-gradient-to-r', lineClassName)}/>}
    </div>
  )
}
