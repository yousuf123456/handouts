"use client";
import React from 'react'

import { CtaLink } from '@/app/(site)/components/CtaLink';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { signOut } from "next-auth/react"

import clsx from 'clsx';

interface SidebarItemProps {
    Icon : IconType;
    label : string;
    href : string;
    isLogout? : boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
    Icon,
    label,
    href,
    isLogout
}) => {

    const pathname = usePathname();
    const isSelected = href.includes(pathname);

    const conditionalClassName = !isLogout && isSelected ? "text-blue-600" : "text-themeSecondary"
    const secondConditionalClassName = isLogout && "text-rose-600 group-hover:text-red-400"

    const onLogOut = ()=> signOut();

  return (
    <>
    {
        !isLogout ? (
            <CtaLink href={href}>
                <div 
                    className={"flex gap-4 items-center cursor-pointer group"}
                >
                    <Icon className={clsx('w-7 h-7 group-hover:text-blue-600',secondConditionalClassName, conditionalClassName)}/>
        
                    <h2 className={clsx('text-base font-text font-semibold group-hover:text-blue-600', conditionalClassName, secondConditionalClassName)}>
                        { label }
                    </h2>
                </div>
            </CtaLink>

        ): (
            <div 
                className={"flex gap-4 items-center cursor-pointer group"}
                onClick={onLogOut}
            >
                <Icon className={clsx('w-7 h-7 group-hover:text-blue-600',secondConditionalClassName, conditionalClassName)}/>
    
                <h2 className={clsx('text-base font-text font-semibold group-hover:text-blue-600', conditionalClassName, secondConditionalClassName)}>
                    { label }
                </h2>
            </div>
        )
    }
    </>
  )
}
