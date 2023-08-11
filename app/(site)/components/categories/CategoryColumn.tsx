import React from 'react'

interface CategoryColumnProps {
    columnData : {name : string, image : string}[]
}

export const CategoryColumn: React.FC<CategoryColumnProps> = ({
    columnData
}) => {
  return (
    <div className='flex flex-col gap-4'>
        {
            columnData.map((category, i) => (
                <div key={i} className='p-2 flex flex-col items-center gap-3 w-32 h-32 bg-white shadow-sm cursor-pointer hover:drop-shadow-lg'>
                    <div className='relative bg-slate-200 w-24 h-24' />

                    <p className='text-center font-text text-sm font-medium line-clamp-1'>
                        { category.name }
                    </p>
                </div>
            ))
        }
    </div>
  )
}
