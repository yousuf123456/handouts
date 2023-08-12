import React from 'react'

export const Heading = ({ children } : { children : React.ReactNode }) => {
  return (
    <h3 className='text-base font-text font-semibold text-black'>
      { children }
    </h3>
  )
}
