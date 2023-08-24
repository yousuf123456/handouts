import React from 'react'
import { Heading } from '../Heading'
import { RecomendedProductsList } from './RecomendedProductsList'

export const RecomendedProducts = async() => {

  return (
    <div className='flex flex-col gap-3'>
        <Heading>
          Just for you
        </Heading>
 
        <RecomendedProductsList />
    </div>
  )
}
 