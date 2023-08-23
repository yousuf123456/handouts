import { Input } from '@/app/components/Input'
import React from 'react'
import { HiSearch } from 'react-icons/hi'
import { SearchBar } from '../../header/components/SearchBar'

export const MH_SearchBar = () => {
  return (
    <div className='min-[420px]:p-6 p-3 fixed w-full h-16 top-0 left-0 flex justify-center items-center bg-gradient-to-br from-cyan-500 to-teal-500 z-[999]'>
        <div className='relative w-full flex items-center'>
            <SearchBar 
              doWhiteBg={true}
            />
        </div>
    </div>
  )
}
