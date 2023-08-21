"use client";
import React, { useEffect } from 'react'
import { SearchedProductsList } from './SearchedProductsList';
import { FullProductType } from '@/app/types';
import { CopySlash } from 'lucide-react';
import axios from 'axios';

interface SearchedProductsProps {
  products : FullProductType[] | undefined,
  searchParams : any;
  category : any;
}

export const SearchedProducts: React.FC<SearchedProductsProps> = ({
  products,

}) => {

  return (
    <div className='w-full pt-6'>
      <SearchedProductsList products={products} />
    </div>
  )
}
