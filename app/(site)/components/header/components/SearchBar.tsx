"use client"

import { getAutoCompleteSuggestions } from '@/app/actions/getAutoCompleteSuggestions'
import { Button } from '@/app/components/Button'
import { Input } from '@/app/components/Input'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiSearch } from "react-icons/hi"
import { SuggestionsFeed } from './SuggestionsFeed'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { cn } from '@/app/utils/cn'

export const SearchBar = () => {

    const { register, watch, setValue, handleSubmit } = useForm<FieldValues>({
        defaultValues : {
            search : ""
        }
    });

    const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const searchTerm = watch("search");
    useEffect(()=> {
        if(!searchTerm.length) return

        const body = {
            searchTerm : searchTerm
        }

        fetch("https://handouts-21hc2v6ov-muhammadyousuf554456-gmailcom.vercel.app/api/getAutoCompleteSuggestions", {
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
                <div className='w-full p-0.5 rounded-l-[3px] bg-gradient-to-r from-themeBlue to-cyan-300'>
                    <Input 
                        id="search"
                        type='text'
                        autoComplete='off'
                        onFocus={()=>setIsAutocompleteOpen(true)}
                        required={true}
                        placeholder='Search in handouts'
                        register={register}
                        className='rounded-l-[3px]'
                    />
                </div>

                <Button aria-label='Search' type='submit' variant='default' className='relative left-[-2px] rounded-l-none rounded-r-[3px] w-10 h-10 flex justify-center items-center'>
                    <HiSearch className='w-6 h-6 text-white font-bold' />
                </Button>
            </div>
        </form>

        {
            isAutocompleteOpen && (
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
