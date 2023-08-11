
import React, { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  children : ReactNode
}

export const Layout: React.FC<LayoutProps> = ({
    children
}) => {
  return (
    <div className='mt-4 w-full h-full bg-slate-100'>
      <div className='py-6 px-12 w-full flex gap-6'>
        <Sidebar />

        { children }
      </div>
    </div>
  )
}
