import React from 'react'

import { PackageType } from '@/app/types'
import { convertToCartItems } from '@/app/utils/convertToCartItems'
import { formatCartItems } from '@/app/utils/formatCartItems'
import { Package_CancellationProductsCard } from './Package_CancellationProductsCard'

interface PackagesListProps {
    packages : PackageType[];
}

export const PackagesList: React.FC<PackagesListProps> = ({
    packages,
}) => {

  return (
    <div className='mt-4 flex flex-col gap-4'>
        {
            packages.map((Package, i)=> (
                <Package_CancellationProductsCard 
                    key={i}
                    packageNumber={i + 1}
                    Package={Package}
                />
            ))
        }
    </div>
  )
}
