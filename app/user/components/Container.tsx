import React, { ReactNode } from 'react'

interface ContainerProps {
    children : ReactNode
}

export const Container: React.FC<ContainerProps> = ({
    children
}) => {
  return (
    <div className='p-4 w-full bg-white drop-shadow-lg'>
      { children }
    </div>
  )
}
