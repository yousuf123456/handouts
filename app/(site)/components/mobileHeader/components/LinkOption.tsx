import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'
import { IconType } from 'react-icons';

interface LinkOptionProps {
    link : {
        name : string;
        href : string;
        icon : IconType
    },
    isSelected : boolean;
}

export const LinkOption: React.FC<LinkOptionProps> = ({
    link,
    isSelected
}) => {
  return (
    <Link href={link.href}>
        <div className='flex flex-col items-center gap-0'>
            <link.icon className={clsx('w-6 h-6 ', !isSelected ? "text-slate-400" : "text-themeBlue")}/>

            <p className={clsx('text-xs font-text line-clamp-1', !isSelected ? "text-slate-500" : "text-themeBlue")}>{link.name}</p>
        </div>
    </Link>
  )
}
