import { SpinnerLoader } from '@/app/components/SpinnerLoader';
import { formatCategoryParam } from '@/app/utils/formatCategoryParam';
import { cn } from '@/lib/utils';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { HiChevronDown, HiChevronRight } from 'react-icons/hi'

export const Categories = () => {
    const [categories, setCategories] = useState<any>();
    const [selectedCatsChilds, setSelectedCatsChilds] = useState<any>([]);
    const [selectedCatsNames, setSelectedCatsNames] = useState<any>([]);

    const [isLoading, setIsLoading] = useState(false);

    const [categoriesOpen, setCategoriesOpen] = useState(false);

    const openCategories = ()=> !isLoading && setCategoriesOpen(true);
    const closeCategories = ()=> setCategoriesOpen(false);

    const resetSelectedCats = ()=>{
        setSelectedCatsChilds([])
        setSelectedCatsNames([])
    }

    const selectCat = (childs: any, catName: string, doNotCheckForDuplication?: boolean)=> {
        if(childs.length === 0) return console.log("Returning because length is: ", childs)

        const isAlreadyIn = selectedCatsChilds.filter((catChilds: any)=> JSON.stringify(catChilds) === JSON.stringify(childs));
        if(isAlreadyIn.length > 0 && !doNotCheckForDuplication) return

        setSelectedCatsNames((prev: any)=> [...prev, catName])
        setSelectedCatsChilds((prev: any)=> [...prev, childs])
    }

    const deselectCat = (childs: string, catName: string, e: any)=> {
        const divRect = e.currentTarget.getBoundingClientRect();
        const divWidth = e.currentTarget.clientWidth - 10
        const mouseX = e.clientX;
        
        if(mouseX > divRect.left + divWidth) return

        const newSelectedCats = selectedCatsChilds.filter((catChilds: any)=> JSON.stringify(catChilds) !== JSON.stringify(childs));
        const newSelectedCatsNames = selectedCatsNames.filter((name: string)=> name !== catName);

        setSelectedCatsNames(newSelectedCatsNames)
        setSelectedCatsChilds(newSelectedCats)
    }

    useEffect(()=> {
        console.log("Setted To: ", selectedCatsChilds)
    }, [selectedCatsChilds])

    useEffect(()=> {
        setIsLoading(true);
        axios.post("../../../../api/getAllCategories")
        .then((res)=> setCategories(res.data))
        .finally(()=> setIsLoading(false))
    }, []);

    const catsCardCs = 'flex flex-col gap-0 bg-white py-4 w-48 drop-shadow-md'
  return (
    <div className='relative h-full pt-2 cursor-pointer'>
        <div onMouseEnter={openCategories} onMouseLeave={()=> {
            closeCategories()
            resetSelectedCats()
        }} className='py-0 px-3 w-36 h-full bg-white rounded-t-sm flex gap-1 items-center justify-center'>
            {
                isLoading ?
                    <CircularProgress
                        size='1.5rem'
                    />
                :(
                <>
                <p className='font-text font-bold text-sm lg:text-base text-themeSecondary text-center'>
                    Categories
                </p>

                <HiChevronDown className={clsx('transition-all text-themeSecondary flex justify-end font-bold w-5 h-5 lg:w-6 lg:h-6', categoriesOpen ? "rotate-180" : "rotate-0")} />
                </>
                )
            }
        </div>

        {
            categoriesOpen && categories &&
            <div onMouseEnter={openCategories} onMouseLeave={()=> {
                closeCategories();
                resetSelectedCats();
            }} className='absolute left-0 bottom-0 translate-y-full flex gap-0 drop-shadow-md py-2'>
                <div className={catsCardCs}>
                    {
                        categories.map((category: any)=> (
                            <Link key={category}  href={`/${formatCategoryParam({toPut : true, category : category[0].name})}`}>
                                <div 
                                    onMouseEnter={()=>selectCat(category[0].children, category[0].name)} 
                                    onMouseLeave={(e)=>deselectCat(category[0].children, category[0].name, e)} 
                                    className={cn('p-2 flex justify-between hover:bg-blue-100 group', selectedCatsNames.includes(category[0].name) && "bg-blue-100")}
                                >
                                    <p className='text-sm font-medium text-slate-700'>
                                        { category[0].name }
                                    </p>

                                    <HiChevronRight className={cn('w-6 h-6 text-themeBlue opacity-0 group-hover:opacity-100', selectedCatsNames.includes(category[0].name) && "opacity-100", category[0].children.length === 0 && "group-hover:opacity-0")} />
                                </div>
                            </Link>
                        ))
                    }
                </div>
                {
                    selectedCatsChilds.map((selectedCatChilds: any, i: number)=> (
                        <div 
                            key={i} 
                            onMouseLeave={(e)=>deselectCat(selectedCatChilds, selectedCatsNames[i], e)} 
                            className={cn(catsCardCs, "border-l-[1px] relative -left-2")}
                        >
                            {
                                selectedCatChilds.map((child: any, i: number)=> (
                                    <Link key={i} href={`/${formatCategoryParam({toPut : true, category : child.name})}`}>
                                        <div onMouseEnter={()=>selectCat(child.children, child.name)} onMouseLeave={(e)=>deselectCat(child.children, child.name, e)} className={clsx('p-2 flex justify-between hover:bg-blue-100 group', selectedCatsNames.includes(child.name) && "bg-blue-100")}>
                                            <p className='text-sm font-medium text-slate-700'>
                                                { child.name }
                                            </p>

                                            <HiChevronRight className={cn('w-6 h-6 text-themeBlue opacity-0 group-hover:opacity-100', selectedCatsNames.includes(child.name) && "opacity-100", child.children.length === 0 && "group-hover:opacity-0")} />
                                        </div>
                                    </Link>
                                ))
                            }    
                        </div>
                    ))
                }
            </div>
        }
    </div>
  )
}
