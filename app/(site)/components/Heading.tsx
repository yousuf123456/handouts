import clsx from 'clsx'
import React, { ReactNode } from 'react'

export const Heading = ({ children, className } : { children : ReactNode, className? : string }) => {
  return ( 
    <h2 className={clsx('text-themeSecondary font-heading text-base md:text-lg font-bold', className)}>
      { children }
    </h2>
  )
}
