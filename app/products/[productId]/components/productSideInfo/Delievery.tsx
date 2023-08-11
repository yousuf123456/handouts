import React from 'react'
import { PortionWrapper } from './PortionWrapper'

export const Delievery = () => {
  return (
    <PortionWrapper
        portionName='Delievery'
    >
        <div className='flex flex-col bg-slate-100 p-3'>
            <div className='flex justify-between items-center'>
                <p className='text-sm font-text font-semibold'>
                    Standard Delievery
                </p>

                
            </div>
        </div>
    </PortionWrapper>
  )
}
