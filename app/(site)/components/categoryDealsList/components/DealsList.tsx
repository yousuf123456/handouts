
import { ProductCard } from '@/app/components/ProductCard';
import { fullCategoryDiscountedProductType } from '@/app/types';
import React, { useEffect, useState } from 'react'

interface DealsListProps {
    products : fullCategoryDiscountedProductType[]
}

export const DealsList: React.FC<DealsListProps> = ({
    products
}) => {

  return (
    <div className='w-full flex gap-4 justify-between overflow-auto scrollbar-none'>
        {   products && (
            products.map((product, i) => {
                return (
                    <ProductCard product={product} showDiscountLabel={true} key={i} />
                )
            }
            )
        )
        }
    </div>
  )
}
