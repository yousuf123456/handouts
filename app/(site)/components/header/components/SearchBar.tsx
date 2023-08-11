"use client"

import { getAutoCompleteSuggestions } from '@/app/actions/getAutoCompleteSuggestions'
import { Button } from '@/app/components/Button'
import { Input } from '@/app/components/Input'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiSearch } from "react-icons/hi"
import { SuggestionsFeed } from './SuggestionsFeed'

export const SearchBar = () => {

    const { register, watch, handleSubmit } = useForm<FieldValues>({
        defaultValues : {
            search : ""
        }
    });

    const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const searchTerm = watch("search");

    // useEffect(()=>{
    //     if (searchTerm) {
    //         axios.post("../../../../api/getAutoCompleteSuggestions", {
    //             searchTerm : searchTerm
    //         })
    //         .then((res) => {
    //             setSuggestions(res.data);
    //         })
    //     }
    // }, [searchTerm])

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        const searchQuery = data.search
        const url = `http://localhost:3000/search?q=${encodeURIComponent(searchQuery)}&from=input`;
        window.location.href = url;
        //Write the search logic here..
    }

  return (
    <div className='w-full relative flex flex-col gap-0'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='relative flex gap-0 w-full'>
                <div className='w-full p-0.5 rounded-l-[3px] bg-gradient-to-r from-themeBlue to-cyan-300'>
                    <Input 
                        id="search"
                        type='text'
                        autoComplete='off'
                        onFocus={()=>setIsAutocompleteOpen(true)}
                        onBlur={()=>setIsAutocompleteOpen(false)}
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

        {/* {
            isAutocompleteOpen && (
                <SuggestionsFeed suggestions={suggestions} />
            )
        } */}
    </div>
  )
}
