"use client";
import React from 'react'
import { ProductCard } from '@/app/components/ProductCard'
import { ProductsListLayout } from '@/app/components/ProductsListLayout';

interface SearchedProductsListProps {
    products :  any
}

export const SearchedProductsList: React.FC<SearchedProductsListProps> = ({
    products
}) => {
  return (
    <>
        {
            products.length ? (
                <div className='grid min-[540px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                    {
                        products.map((product : any, i:number) => (
                            <ProductCard 
                                key={i} 
                                dynamic={true}
                                product={product} 
                                showDiscountLabel={false} 
                            />
                        ))
                    } 
                </div>
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
    </>
  )
}
