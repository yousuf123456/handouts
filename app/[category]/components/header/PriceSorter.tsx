import { SelectOptions } from '@/app/components/SelectOptions'
import React from 'react'

export const PriceSorter = () => {
  return (
    <div>
        <SelectOptions 
            label='Sort By'
            options={["Price Low to High", "Price High to Low"]}
            defaultValue='Best Match'
        />
    </div>
  )
}
