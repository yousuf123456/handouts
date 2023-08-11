"use client"
import CircularProgress from '@mui/material/CircularProgress'
import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SpinnerLoaderProps {
  className? : string;
  color? : string;
  size? : string;
}

export const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({
  className,
  color,
  size
}) => {
  return (
    <div className={twMerge(clsx('pt-8 w-full h-screen flex justify-center mt-8', className))}>
      <CircularProgress 
        color="secondary" 
        size={size}
        sx={{ color : color }}
      />
    </div>
  )
}
