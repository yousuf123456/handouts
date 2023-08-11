import clsx from 'clsx'
import React from 'react'

export const Container = ({
  children,
  noPadding
} : { children : React.ReactNode, noPadding? : boolean }) => {
  return (
    <div className={clsx('bg-white w-full h-full drop-shadow-lg', noPadding ? "p-0" : "p-4")}>
      { children }
    </div>
  )
}
