"use client"

import React, { useEffect, useRef, useState } from 'react'
import { IParams } from '../../types';
import { Facets } from './Facets';
import { ReduxProvider } from '@/app/context/ReduxProvider';
import { Header } from './Header';
import { SearchedProducts } from './SearchedProducts';
import { getCategoryTree } from '@/app/utils/getCategoryTree';

import { useQuery } from "@tanstack/react-query"

import Loading from '../loading';
import axios from 'axios';

function fetchSearchedProducts(searchParams:any, category:any) {
    const body = {
        params : searchParams,
        category : category
    }
    return fetch("../../api/getSearchedProducts", {method: "POST", body : JSON.stringify(body)}).then(async(res)=> await res.json())
}

function fetchFacetsData(searchTerm:any, category:any) {
    const body = {
        searchTerm : searchTerm,
        category : category
    }
    return fetch('../../api/getFacets', {method : "POST", body : JSON.stringify(body) }).then(async(res)=> await res.json())
}

interface SearchedTermResults {
    searchParams : IParams;
    categoryData : any;
    category : string;
}

export const SearchedTermResults: React.FC<SearchedTermResults> = ({
    searchParams,
    categoryData,
    category
}) => {

    const { 
        data, 
        fetchStatus,
        isLoading : isLoading1,
        refetch : refetchProducts,

    } = useQuery(["searchedProductsData"], ()=>fetchSearchedProducts(searchParams, category), {
        refetchOnWindowFocus : false,
        enabled : false
    })

    const { 
        data: facetsData, 
        isLoading : isLoading2,
        refetch : refetchFacets

    } = useQuery(["facetsData"], ()=> fetchFacetsData(searchParams.q, category),{
        refetchOnWindowFocus : false
    })
    
    useEffect(()=> {
        refetchProducts();

    }, [searchParams])

    const categoryTreeData = categoryData ? getCategoryTree(categoryData.rawCategoryData, null) : null;
    const fullCategoryTreeData = categoryData ? getCategoryTree([...categoryData.rawCategoryData, ...categoryData.descendants], categoryData.parent.parentId) : null;

    if((isLoading1 && fetchStatus !== "idle") || isLoading2) {
        return (
            <Loading />
        )
    }

  return (
      <div className='lg:flex h-full w-full mt-8'>
        <div className='hidden lg:block'>
          <Facets
            facets={facetsData[0].facet} 
            categoryTreeData={fullCategoryTreeData}
          />
        </div>

        <div className='px-4 flex flex-col gap-3 w-full'>
          <ReduxProvider>
            <Header 
              searchTerm={searchParams.q}
              facets={facetsData[0].facet}
              categoryTree={categoryTreeData}
              count={facetsData[0].count.lowerBound}
            />
          </ReduxProvider>

          <SearchedProducts
            searchParams={searchParams}
            category={category}
            products={data}
          />
        </div>
      </div>
  )
}