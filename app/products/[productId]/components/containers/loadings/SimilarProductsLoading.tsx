"use client";

import { Heading } from '@/app/(site)/components/Heading'
import LinearProgress from '@mui/material/LinearProgress'
import React from 'react'

export const SimilarProductsLoading = () => {
  return (
    <div className='flex flex-col gap-4'>
        <Heading>
            Similar Products
        </Heading>
        <LinearProgress color="secondary" />
    </div>
  )
}
