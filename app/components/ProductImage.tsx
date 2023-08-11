import Image from 'next/image';
import React from 'react'

interface ProductImageProps {
  src : string | null 
  loading? : "lazy" | "eager"
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  loading
}) => {
  return (
    <Image 
      src={src || ""}
      alt='Product Image'
      loading={loading}
      className='object-cover'
      fill
    />
  )
}
