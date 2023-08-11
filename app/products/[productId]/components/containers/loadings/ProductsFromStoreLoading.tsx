"use client"
import { Heading } from '@/app/(site)/components/Heading'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

export const ProductsFromStoreLoading = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
        <Heading>
            From the Same Store
        </Heading>

        <CircularProgress 
            color="secondary" 
        />
    </div>
  )
}
