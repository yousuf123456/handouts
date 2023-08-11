
import { OrderedProductType } from '@/app/types'
import React from 'react'

interface ProductInfoProps {
  orderedProduct : OrderedProductType
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
    orderedProduct
}) => {
  return (
    <p className='text-base font-text text-black line-clamp-1'>
        { orderedProduct.product.name }
    </p>
  )
}
