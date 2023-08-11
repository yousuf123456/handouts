'use client'
import Skeleton from '@mui/material/Skeleton';
import React from 'react'

export const InformationLoading = () => {
  return (
    <div className='flex gap-0'>
        <div className='flex flex-col gap-2 items-start'>
            <Skeleton variant='rounded' height={320} width={320} />

            <div className='w-80 flex gap-2 items-center justify-center'>
                <Skeleton variant='rounded' width={26} height={26} />   
                <div className='flex gap-3'>
                    <Skeleton variant='rounded' height={64} width={64} />
                    <Skeleton variant='rounded' height={64} width={64} />
                    <Skeleton variant='rounded' height={64} width={64} />
                </div>                         
                <Skeleton variant='rounded' width={26} height={26} />
            </div>
        </div>

        <div className='ml-6 px-6 w-full flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <Skeleton variant='text' width={248} sx={{ fontSize: '2.5rem' }} />
                <div className='flex flex-col gap-0'>
                    <div className='flex gap-2 items-center'>
                        <Skeleton variant='rounded' width={120} height={26} />   
                        <Skeleton variant='text' width={48} sx={{ fontSize: '0.875rem' }} />
                    </div>

                    <div className='mt-1'>
                        <Skeleton variant='text' width={120} sx={{ fontSize: '0.75rem' }} />
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-0'>
                <Skeleton variant='text' width={120} sx={{ fontSize: '2.5rem' }} />
            </div>

            <div className='mt-0 flex gap-2 items-center'>
                <Skeleton variant='text' width={72} sx={{ fontSize: '1.2rem' }} />
                <Skeleton variant='text' width={8} sx={{ fontSize: '1.2rem' }} />
                <div className='flex gap-1'>
                    <Skeleton variant='rounded' width={24} height={24} />
                    <Skeleton variant='rounded' width={48} height={24} />
                    <Skeleton variant='rounded' width={24} height={24} />
                </div>
            </div>


            <div className='h-full flex items-end gap-12'>
                <Skeleton variant='rounded' width={164} height={42} />
                <Skeleton variant='rounded' width={144} height={42} />
            </div>
        </div>

        <div className='px-4 w-56 border-l-2 border-slate-300 flex-shrink-0'>
            <div className='flex flex-col gap-2'>
                <Skeleton variant='text' width={80} sx={{ fontSize: '0.875rem' }} />

                <div className='w-full p-3 bg-slate-100 flex flex-col items-center'>
                    <Skeleton variant='circular' width={96} height={96} />

                    <Skeleton variant='text' width={120} sx={{ fontSize: '1.5rem' }} />

                    <div className='mt-4 mb-4 w-full flex flex-col gap-2 items-start'>
                        <div className='w-full flex flex-col gap-0'>
                            <Skeleton variant='text' width={80} sx={{ fontSize: '0.75rem' }} />
                            <Skeleton variant='rounded' width={120} height={26} />
                        </div>

                        <div className='w-full flex flex-col gap-0'>
                            <Skeleton variant='text' width={80} sx={{ fontSize: '0.75rem' }} />
                            <Skeleton variant='rounded' width={120} height={26} />
                        </div>
                    </div>

                    <Skeleton variant='text' width={96} sx={{ fontSize: '1.3rem' }} />
                </div>
            </div>
        </div>
    </div>
  )
}
