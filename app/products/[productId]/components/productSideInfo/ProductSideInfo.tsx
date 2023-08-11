import React from 'react'

import { ProductInfo } from '@/app/types'
import { StoreInfo } from './StoreInfo'
import { Services } from './Services'
import { Delievery } from './Delievery'

interface ProductSideInfoProps {
  product : ProductInfo
} 


export const ProductSideInfo: React.FC<ProductSideInfoProps> = ({
  product
}) => {

  return (
    <div className='px-4 w-72 border-l-2 border-slate-300 flex-shrink-0'>
      <div className='flex flex-col gap-4'>
        <Services />

        <StoreInfo
          store={product.store}
        />
      </div>
    </div>
  )
}
