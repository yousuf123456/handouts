import { searchProducts } from '@/app/actions/searchProducts';
import { ProductCard } from '@/app/components/ProductCard';
import React from 'react'
import { SearchedProductsList } from './SearchedProductsList';
import { FullProductType } from '@/app/types';

interface SearchedProductsProps {
    products : FullProductType[] | undefined,
}

export const SearchedProducts: React.FC<SearchedProductsProps> = ({
    products
}) => {

  return (
    <div className='w-full pt-6'>
      <SearchedProductsList products={products} />
    </div>
  )
}
