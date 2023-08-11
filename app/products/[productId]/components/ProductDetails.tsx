"use client"
import React, { useState } from 'react'

import { Heading } from '@/app/(site)/components/Heading'
import { ProductInfo } from '@/app/types'
import { ProductSpec } from './ProductSpec'

import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/app/components/Button'
import { CtaLink } from '@/app/(site)/components/CtaLink'

interface ProductDetailsProps {
    product : ProductInfo 
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product
}) => {

  const productAttributes = product.attributes as {
    [key : string] : any
  }

  const [showingMore, setShowingMore] = useState(false)

  return (
    <div id='details' className={clsx('flex flex-col gap-4 overflow-hidden transition-all', !showingMore ? "h-96" : "pb-16 h-auto")}>
      <Heading>
        Product Details 
      </Heading>

      <CtaLink href='#details'>
        <Button onClick={()=> setShowingMore((prev)=> !prev)} variant="outline" className='z-[99] absolute bottom-2 left-1/2 -translate-x-1/2'>
          {!showingMore ? "Show More" : "Show Less"}
        </Button>
      </CtaLink>

      {!showingMore && <div className='absolute w-full bottom-12 left-0 h-12 bg-gradient-to-t from-white to-transparent'/>}
      {!showingMore && <div className='absolute bottom-0 left-0 w-full h-12 bg-white'/>}

      <div className='flex flex-col gap-6'>
        <ul className='ml-6 list-disc'>
          {
            product?.details.map((detail, i)=> (
              <li key={i}>
                <p className='text-sm font-medium text-black'>
                  { detail }
                </p>
              </li>
            ))
          }
        </ul>

        <div className='flex flex-col gap-4'>
          {
            product.detailedImages.map((img)=> (
              <Image
                key={img}
                src={img || ""}
                width={1680}
                height={600}
                alt='Product Image'
                className='object-cover aspect-auto max-w-full h-auto'
              />
            ))
          }
        </div>
        
        <div className='flex flex-col gap-4'>
          <Heading>
            Product Specifications
          </Heading>

          <div className='flex items-center gap-6 flex-wrap'>
            {
              Object.keys(productAttributes).map((Key: string, i)=> (
                <ProductSpec 
                  key={i}
                  Key={Key}
                  value={productAttributes[Key]}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
