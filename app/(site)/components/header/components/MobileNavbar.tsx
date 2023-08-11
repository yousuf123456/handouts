
import React from 'react'
import { Favourites } from './Favourites'
import { Cart } from './Cart'
import { SearchBar } from './SearchBar'

export const MobileNavbar = () => {
  return (
    <div className='h-14 block sm:hidden px-4 py-2 fixed left-0 bottom-0 w-full bg-white shadow-lg z-50'>
        {/* <div className='flex justify-between items-center'> */}
          <div>
              <SearchBar />
          </div>
        {/* </div> */}
    </div>
  )
}
