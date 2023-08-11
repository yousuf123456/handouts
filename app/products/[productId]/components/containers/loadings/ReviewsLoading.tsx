"use client"
import { Heading } from '@/app/(site)/components/Heading'
import LinearProgress from '@mui/material/LinearProgress'
import React from 'react'

export const ReviewsLoading = () => {
  return (
    <div className='flex flex-col gap-4'>
        <Heading>
            Rating and Reviews
        </Heading>
        <LinearProgress color="secondary" />
    </div>
  )
}
