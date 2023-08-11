import React from 'react'

interface ProductSpecProps {
    Key : string;
    value : any
}

export const ProductSpec: React.FC<ProductSpecProps> = ({
    Key,
    value
}) => {

  return (
    <div className='flex gap-2 items-center'>
        <p className='capitalize text-sm font-text text-slate-600'>
            { Key + " : " }
        </p>

        <p className='text-sm font-text text-black'>
            {
                Array.isArray(value) ?
                value.join(",  ")
                :
                value
            }
        </p>
    </div>
  )
}
