import React from 'react'
import { ReduxProvider } from '../context/ReduxProvider'
import { FavouritesItems } from './components/FavouritesItems'

export default function FavouritesPage() {
  return (
    <div className='min-h-[360px] pb-12 w-full bg-white'>
      <ReduxProvider>
          <FavouritesItems />
      </ReduxProvider>
    </div>
  )
}
