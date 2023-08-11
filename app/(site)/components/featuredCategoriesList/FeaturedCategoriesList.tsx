import React from 'react'
import { FeaturedCategoryCard } from './components/FeaturedCategoryCard'
import { useFeaturedCategories } from '@/app/hooks/useFeaturedCategories'

export const FeaturedCategoriesList = () => {
    const categories = useFeaturedCategories();

  return (
    <div className='flex justify-start min-[1300px]:justify-center overflow-auto scrollbar-none'>
        <div className='mt-10 md:mt-12 flex justify-between gap-8 md:gap-12'>
          {
            categories.map((category) => (
              <FeaturedCategoryCard 
                key={category.name}
                name={category.name} 
                desc={category.description} 
                image={category.image} 
              />
            ))
          }
        </div>
    </div>
  )
}
