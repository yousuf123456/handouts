import React from 'react'
import { IconType } from 'react-icons'

interface EmptyStateProps {
    Icon : IconType;
    label : string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    Icon,
    label
}) => {
  return (
    <div className='w-full h-full flex flex-col gap-6 justify-center items-center'>
        <Icon 
            className='w-12 h-12 text-slate-400'
        />

        <h1 className='text-xl font-text font-semibold text-slate-500 capitalize'>
            { label }
        </h1>
    </div>
  )
}
