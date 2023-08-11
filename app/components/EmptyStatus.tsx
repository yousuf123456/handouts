import React from 'react'

interface EmptyStatusProps {
    label : string
}

export const EmptyStatus: React.FC<EmptyStatusProps> = ({
    label
}) => {
  return (
    <div className='mt-8 w-full flex justify-center items-start'>
        <p className='text-xl font-text font-semibold text-slate-600'>
            { label }
        </p>
    </div>
  )
}
