"use client"

import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

export const SpinnerLoading = () => {
  return (
    <div className='h-full flex justify-center items-center'>
        <CircularProgress
            color="info"
            size="3rem"
        />
    </div>
  )
}
