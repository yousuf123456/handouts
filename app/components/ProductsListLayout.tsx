import React from 'react'

interface ProductsListLayoutProps {
    children : React.ReactNode
}

export const ProductsListLayout: React.FC<ProductsListLayoutProps> = ({
    children
}) => {
  return (
    <div className='flex flex-wrap gap-3 justify-between'>
      { children }
    </div>
  )
}
