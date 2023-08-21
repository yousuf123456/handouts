"use client";
import React from 'react'
import { ProductCard } from '@/app/components/ProductCard'

interface SearchedProductsListProps {
    products :  any
}

export const SearchedProductsList: React.FC<SearchedProductsListProps> = ({
    products
}) => {
  return (
    <div className='w-full flex flex-wrap gap-3 justify-between'>
        {
            products?.length ? (
                products.map((product : any, i:number) => (
                    <ProductCard 
                        key={i} 
                        product={product} 
                        showDiscountLabel={false} 
                    />
                ))
            )
            :
            (
                <div className='w-full h-full flex justify-center items-center'>
                    <h1 className='text-xl text-center text-red-500 font-heading font-semibold'>
                        No Results Found
                    </h1>
                </div>
            )
        }
    </div>
  )
}
