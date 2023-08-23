import React from 'react'
import { MH_SearchBar } from './components/MH_SearchBar'
import { BottomBar } from './components/BottomBar'

export const MobileHeader = () => {
  return (
    <div className='block sm:hidden'>
        <MH_SearchBar />
        <BottomBar />
    </div>
  )
}
