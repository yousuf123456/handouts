import React from 'react'
import { Heading } from '../Heading'
import { useCategories } from '@/app/hooks/useCategories'
import { CategoryColumn } from './CategoryColumn';

export const Categories = () => {
  const categoryColumns = useCategories();

  return (
    <div>
      <Heading>
        Categories
      </Heading>

      <div className='w-full flex gap-2 justify-between overflow-auto scrollbar-none'>
        {
          categoryColumns.map((categoryColumn, i) => (
            <CategoryColumn key={i} columnData={categoryColumn} />
          ))
        }
      </div>
    </div>
  )
}
