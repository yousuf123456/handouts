"use client"
import { addSelectedFacet, removeselectedFacet } from '@/app/store/features/selectedFacetsSlice';
import { useAppSelector } from '@/app/store/store';
import { formatCategoryParam } from '@/app/utils/formatCategoryParam';
import { updateSearchParam } from '@/app/utils/updateSearchParam';
import Checkbox from '@mui/material/Checkbox'
import clsx from 'clsx';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

interface BucketProps {
  bucket : {_id : string, count? : number};
  queryName : string;
}

export const Bucket: React.FC<BucketProps> = ({
  bucket,
  queryName
}) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname() || "/"

  const currentFacet = useAppSelector(state=> state.selectedFacets.facets[queryName]);
  const selectedFacet = currentFacet ? currentFacet.includes(bucket._id) : false
  
  function handleQueryChange(name : string, query : string, event? : any){
    const Delete = (event && !event.target?.checked) || selectedFacet

    if (searchParams?.entries()) {
      const updatedSearchParams = updateSearchParam(searchParams, name , query, Delete);
      router.push(`${pathName}?${updatedSearchParams.toString()}`, {shallow: true})
    }
  }

  function handleCategoryFacetSelect(value: string){
    const param = value.split(" ").map((word)=> word.toLowerCase()).join("-")
    router.push(`/${param}?${searchParams}`)
  }

  const dispatch = useDispatch();
  const selectFacet = (key:string, value:string)=> dispatch(addSelectedFacet({ [key] : value }));
  const deselectFacet = (key:string, value:string)=> dispatch(removeselectedFacet({ [key] : value }));

  return (
    <div className='flex gap-1 items-center'>
      <div className='hidden lg:block'>
        <Checkbox 
          size="small" 
          id={bucket._id}
          inputProps={{ 'aria-label': 'controlled' }}
          checked={selectedFacet || params.category === formatCategoryParam({ toPut : true, category : bucket._id })}
          onChange={
            (e: any)=> {
              if(queryName === "category" && !e.target.checked) return
              if(queryName === "category") return handleCategoryFacetSelect(bucket._id)
              handleQueryChange(queryName, bucket._id, e);
              e.target.checked ? selectFacet(queryName, bucket._id) : deselectFacet(queryName, bucket._id)
            }
          } 
        />
      </div>
      
      <div 
        onClick={()=> {
          if(queryName === "category" && params.category === formatCategoryParam({ toPut : true, category : bucket._id })) return
          if(queryName === "category") return handleCategoryFacetSelect(bucket._id)
          handleQueryChange(queryName, bucket._id)
          selectedFacet ? deselectFacet(queryName, bucket._id) : selectFacet(queryName, bucket._id)
        }}
        className={clsx('max-lg:rounded-lg max-lg:py-1 max-lg:px-4 max-lg:bg-slate-200 max-lg:cursor-pointer', selectedFacet && "max-lg:bg-green-100")}
      >
        <p className={clsx('text-sm font-text text-slate-700 lg:text-slate-600 line-clamp-1', selectedFacet && "max-lg:text-green-500 max-lg:font-semibold")}>
          { bucket._id }
        </p>
      </div>
    </div>
  )
}
