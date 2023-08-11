import clsx from 'clsx';
import React, { ReactNode } from 'react'

interface SocialButtonProps {
    icon : ReactNode;
    text : string;
    bg : string;
    social : string;
    isLoading : boolean;
    onClick : any
}

export const SocialButton: React.FC<SocialButtonProps> = ({
    icon, 
    text,
    bg,
    social,
    isLoading,
    onClick
}) => {
  return (
    <div 
    onClick={()=>{
        if (!isLoading) {
            onClick(social)
        }
    }} 
    className={clsx(`
        transition-all 
        rounded-sm 
        cursor-pointer 
        w-full 
        px-4 
        py-2 
        flex 
        sm:gap-4
        sm:justify-center
        justify-between 
        md:pr-12
        items-center`, 
        isLoading ? "opacity-60 cursor-auto" : "",
        bg
        )}>
        <p 
            className='
                font-text
                text-sm 
                tracking-wider 
                font-semibold 
                text-white'
            >
                
            { text }
        </p>
        {icon}
    </div>
  )
}
