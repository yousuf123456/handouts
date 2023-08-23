"use client"
import React, { useEffect, useState } from 'react'

import { Button } from '@/app/components/Button'
import { Input } from '@/app/components/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiSearch } from "react-icons/hi"
import { SuggestionsFeed } from './SuggestionsFeed'
import { useRouter } from 'next/navigation'
import { cn } from '@/app/utils/cn'
import clsx from 'clsx'

interface SearchBar {
    doWhiteBg? : boolean;
    hideSuggestions? : boolean;
}

export const SearchBar: React.FC<SearchBar> = ({
    doWhiteBg,
    hideSuggestions
}) => {

    const { register, watch, setValue, handleSubmit } = useForm<FieldValues>({
        defaultValues : {
            search : ""
        }
    });

    const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const searchTerm = watch("search");
    useEffect(()=> {
        if(hideSuggestions) return
        if(!searchTerm.length) return

        const body = {
            searchTerm : searchTerm
        }

        fetch("https://handouts-six.vercel.app/api/getAutoCompleteSuggestions", {
            method : "post",
            body : JSON.stringify(body)
        })
        .then(async(res)=> {
            const suggestions = await res.json();
            setSuggestions(suggestions);
        })
    }, [searchTerm])

    useEffect(()=> {
        if(!isAutocompleteOpen) setSuggestions([])
    }, [isAutocompleteOpen])

    const router = useRouter();
    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        const searchBar = document.getElementById("searchBar");
        searchBar?.blur();

        setIsAutocompleteOpen(false);
        const searchQuery = data.search;
        router.push(`/search?q=${searchQuery}&from=input`)
    }

  return (
    <>
    <div className='w-full relative flex flex-col gap-0 z-[99]'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='relative flex gap-0 w-full'>
                <div className={clsx("w-full", !doWhiteBg && 'p-0.5 rounded-l-[3px] bg-gradient-to-r from-themeBlue to-cyan-300')}>
                    <Input 
                        id="search"
                        type='text'
                        autoComplete='off'
                        onFocus={()=>setIsAutocompleteOpen(true)}
                        required={true}
                        placeholder='Search in handouts'
                        register={register}
                        className={clsx('rounded-l-[2px]', doWhiteBg && "shadow-md")}
                    />
                </div>

                <Button aria-label='Search' type='submit' variant='default' className={cn('relative left-[-2px] rounded-l-none rounded-r-[2px] w-10 h-10 flex justify-center items-center', doWhiteBg && "h-9 bg-white hover:bg-white")}>
                    <HiSearch className={clsx('w-6 h-6 font-bold', doWhiteBg ? "text-themeSecondary" : "text-white")} />
                </Button>
            </div>
        </form>

        {
            !hideSuggestions && isAutocompleteOpen && (
                <SuggestionsFeed 
                    onClick={(query)=>{
                        setIsAutocompleteOpen(false)
                        setValue("search", query)
                    }}
                    suggestions={suggestions} 
                />
            )
        }
    </div>
    {<div onClick={()=>setIsAutocompleteOpen(false)} className={cn('fixed inset-0 bg-black transition-all duration-300 ease-out', isAutocompleteOpen ? "bg-opacity-25 z-50 pointer-events-auto" : "bg-opacity-0 z-[-10] pointer-events-none" )}/>}
    </>
  )
}
