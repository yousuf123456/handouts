import { ProductCard } from '@/app/components/ProductCard'
import React from 'react'

interface FlashProductsListProps {
    products : any
}

export const FlashProductsList: React.FC<FlashProductsListProps> = ({
    products
}) => {
  return (
    <div className='w-full flex gap-4 justify-between overflow-auto scrollbar-none'>
        {
            products.map((product : any) => (
                <ProductCard product={product} key={product.name} />
            ))
        }
    </div>
  )
}
