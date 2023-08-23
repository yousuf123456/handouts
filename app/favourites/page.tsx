import React from 'react'
import { ReduxProvider } from '../context/ReduxProvider'
import { FavouritesItems } from './components/FavouritesItems'
import { NavigationPanel } from '../components/NavigationPanel'

export default function FavouritesPage() {
  return (
    <div className='min-h-[360px] pb-12 w-full flex flex-col gap-0 bg-white'>
      <NavigationPanel heading='Favourites' />

      <ReduxProvider>
        <FavouritesItems />
      </ReduxProvider>
    </div>
  )
}
