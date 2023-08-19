"use client"
import { SelectOptions } from '@/app/components/SelectOptions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { RatingAndReview } from '@prisma/client'
import { FaArrowUp, FaFlask } from 'react-icons/fa'
import { getSearchParamsArray } from '../utils/getSearchParamsArray'

interface SortAndFiltersProps {
    lastReview : RatingAndReview;
    firstReview : RatingAndReview;
    goingBack : boolean;
}

export const SortAndFilters: React.FC<SortAndFiltersProps> = ({
    lastReview,
    firstReview,
    goingBack
}) => {

    const sortOptions = [
        {
            label : "Recent", 
            searchParam : `sortBy=rating`,
            remove : true
        },
        {
            label : "Rating: High To Low", 
            searchParam : `sortBy=rating&direction=desc`,
            remove : false
        },
        {
            label : "Rating: Low To High", 
            searchParam : `sortBy=rating&direction=asc`,
            remove : false
        }
    ]

    const filterOptions = [
        {
            label : "All Stars",
            searchParam : "filter=1",
            remove : true
        },

        {
            label : "5 Star",
            searchParam : "filter=5",
            remove : false
        },

        {
            label : "4 Star",
            searchParam : "filter=4",
            remove : false
        },

        {
            label : "3 Star",
            searchParam : "filter=3",
            remove : false
        },

        {
            label : "2 Star",
            searchParam : "filter=2",
            remove : false
        },

        {
            label : "1 Star",
            searchParam : "filter=1",
            remove : false
        }
    ]

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const filter = searchParams.get("filter");
    const sortBy = searchParams.get("sortBy");
    const sortByDirection = searchParams.get("direction");

    const onSort = (value: any)=> {
        const paramsToRemove = ["sortBy", "direction", "cursor", "page", "prevPage", "tieBreaker"]
        let paramsArray = getSearchParamsArray(searchParams, paramsToRemove)

        const linkOption = sortOptions.filter((option)=> option.label === value)[0] as any

        if(linkOption.remove){
            return router.push(pathname)
        }

        paramsArray.push(`sortBy=rating&direction=${value === "Rating: High To Low" ? "desc" : "asc"}`)

        const paramsString = paramsArray.join("&");
        router.push(`${pathname}?${paramsString}`)
    }

    const onFilter = (value: any)=> {
        const linkOption = filterOptions.filter((option)=> option.label === value)[0];
        const paramsToRemove = ["filter"]

        const paramsArray = getSearchParamsArray(searchParams, paramsToRemove);

        if(!linkOption.remove) paramsArray.push(`filter=${value[0]}`)
        const paramsString = paramsArray.join("&")

        router.push(`${pathname}?${paramsString}`)
    }

    const sortDefaultValue = (sortBy && sortByDirection) 
    ? (sortByDirection === "desc" ? "Rating: High To Low" : "Rating: Low To High") 
    : sortOptions[0].label

    const filterDefaultValue = (filter) ? filter + " Star" : "All Stars"

  return (
    <div className='w-fit flex gap-12 items-center'>
        <div className='flex gap-2 items-center'>
            <div className='flex gap-1 items-center'>
                <FaArrowUp className="w-3 h-3 text-slate-400"/>
                <p className='text-sm font-semibold text-slate-500'>Sort</p>
            </div>

            <div className='flex-shrink-0'>
                <Select defaultValue={sortDefaultValue} onValueChange={onSort}>
                    <SelectTrigger className="w-full h-[38px] bg-slate-100 outline-none gap-2 placeholder:text-slate-500">
                        <SelectValue placeholder={"Sort"} />
                    </SelectTrigger>
                    <SelectContent className={("w-full z-[1000] max-h-72 overflow-y-auto")}>
                        <SelectGroup>
                        <SelectLabel> Sort </SelectLabel>
                        {
                            sortOptions.map((option) => (
                                <SelectItem key={option.label} value={option.label}>
                                    {option.label}
                                </SelectItem>
                            ))
                        }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
        
        <div className='flex gap-2 items-center'>
            <div className='flex gap-1 items-center'>
                <FaFlask className="w-3 h-3 text-slate-400"/>
                <p className='text-sm font-semibold text-slate-500'>Filter</p>
            </div>
            <div className='flex-shrink-0'>
                <Select defaultValue={filterDefaultValue} onValueChange={onFilter}>
                    <SelectTrigger className="w-full h-[38px] bg-slate-100 outline-none gap-2 placeholder:text-slate-500">
                        <SelectValue placeholder={"Filter"} />
                    </SelectTrigger>
                    <SelectContent className={("w-full z-[1000] max-h-72 overflow-y-auto")}>
                        <SelectGroup>
                        <SelectLabel> Filter </SelectLabel>
                        {
                            filterOptions.map((option) => (
                                <SelectItem key={option.label} value={option.label}>
                                    {option.label}
                                </SelectItem>
                            ))
                        }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    </div>
  )
}
