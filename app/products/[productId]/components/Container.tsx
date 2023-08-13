import { cn } from '@/app/utils/cn'
import clsx from 'clsx'
import React from 'react'

export const Container = ({
  children,
  noPadding,
  wFit,

} : { children : React.ReactNode, noPadding? : boolean, wFit? : boolean }) => {
  return (
    <div className={cn('bg-white h-full drop-shadow-lg', noPadding ? "p-0" : "p-4", wFit ? "w-fit" : "w-full")}>
      { children }
    </div>
  )
}
