"use client"
import React, { useEffect, useState } from 'react'

import { Seperator } from '@/app/components/Seperator';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { FaTimes } from "react-icons/fa"
import { removeselectedFacet, setSelectedFacets } from '@/app/store/features/selectedFacetsSlice';
import { updateSearchParam } from '@/app/utils/updateSearchParam';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { HiChevronDown } from 'react-icons/hi';
import { DrawerComp } from '@/app/components/DrawerComp';
import { Facets } from './Facets';
import { CategoryBreadCrumbs } from './CategoryBreadCrumbs';

import clsx from 'clsx';
import { SelectOptions } from '@/app/components/SelectOptions';
import { catalogSortOptions } from '@/app/constants/selectOptions';

interface HeaderProps {
    searchTerm : string | undefined;
    categoryTree : any,
    count : number;
    facets : any
}

export const Header: React.FC<HeaderProps> = ({
    categoryTree,
    searchTerm,
    facets,
    count
}) => {

    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname() || "/"

    useEffect(()=> {
        const params = Object.fromEntries(searchParams.entries());
        dispatch(setSelectedFacets(params));
    }, [])

    function handleQueryChange(name : string, query : string){
        if (searchParams?.entries()) {
          const updatedSearchParams = updateSearchParam(searchParams, name , query, true);
          router.push(`${pathName}?${updatedSearchParams.toString()}`, {shallow: true})
        }
    }
    
    const selectedFacets = useAppSelector(state=> state.selectedFacets.facets);

    const deselectFacet = (key:string, value:string)=>{
        dispatch(removeselectedFacet({ [key] : value }));
        handleQueryChange(key, value)
    }

    const onSort = (value: string)=> {
        console.log(value)
    }

  return (
    <>
    <div className='flex flex-col gap-2'>
        <CategoryBreadCrumbs 
            categoryTree={categoryTree}
        />

        <Seperator />

        <div className='w-full flex flex-col gap-0 justify-center'>
            <div className='flex items-center justify-between'>
                <h2 className='text-sm text-slate-700 lg:block hidden line-clamp-1'>
                    Showing results for the <span className='text-sm font-medium text-black'>{searchTerm}</span>
                </h2>

                <div className='pr-16 flex gap-2 items-center'>
                    <p className='flex-shrink-0 text-sm text-slate-600'>
                        Sort By
                    </p>
                    <SelectOptions
                        label='Sort By'
                        onChange={onSort}
                        defaultValue='Best Match'
                        linkOptions={catalogSortOptions}
                    />
                </div>

                <div 
                    onClick={()=> setOpen((prev)=>!prev)} 
                    className='w-full flex gap-2 justify-end items-center cursor-pointer lg:hidden'
                >
                    <p className='text-sm sm:text-base font-text text-themeBlue font-semibold'>Filters</p>
                    <HiChevronDown className={clsx('w-6 h-6 text-blue-300 transition-all', open && "rotate-180") } />
                </div>
            </div>

            <div className={clsx('flex gap-2 flex-wrap', Object.keys(selectedFacets).length && "mt-3")}>
                {
                    Object.keys(selectedFacets).map((key)=> (
                        <div key={key} className='py-1 px-3 flex items-center gap-2 rounded-3xl bg-blue-100'>
                            <h3 className='text-sm text-slate-500'>
                                { key + " : " }
                            </h3>
                            <div className='flex gap-2'>
                                {
                                    selectedFacets[key].map((value, i) => (
                                        <div key={i} onClick={()=>deselectFacet(key, value)} className='flex items-center gap-0.5 cursor-pointer group'>
                                            <p className='text-sm text-slate-800'> {selectedFacets[key].length -1 !== i ? value : value } </p>
                                            <div className='flex items-center gap-0'>
                                                <FaTimes className='w-3 h-3 text-red-400 group-hover:text-red-500 transition-all' />
                                                <p>{ selectedFacets[key].length - 1 !== i && "," }</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

        <Seperator />
    </div>

    <DrawerComp
        open={open}
        setOpen={setOpen} 
    >
        <Facets 
            facets={facets}
        />
    </DrawerComp>
    </>
  )
}
