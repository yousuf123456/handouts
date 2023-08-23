import React from 'react'

interface ProductsListLayoutProps {
    children : React.ReactNode
}

export const ProductsListLayout: React.FC<ProductsListLayoutProps> = ({
    children
}) => {
  return (
    <div className='grid grid-cols-2 min-[540px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
      { children }
    </div>
  )
}
