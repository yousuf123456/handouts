"use client";
import React from 'react'
import Link from 'next/link';

import { fullCategoryDiscountedProductType } from '../types';
import { priceLabel } from '../utils/priceLabel';
import { RatingStars } from './RatingStars';

import { getPriceInfo } from '../utils/getPriceInfo';
import { ProductImage } from './ProductImage';
import { FormattedCurrency } from './FormattedCurrency';


interface ProductCardProps {
    product : fullCategoryDiscountedProductType;
    showDiscountLabel? : boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
    product, 
    showDiscountLabel 
}) => {

    const {
        productOnSale,
        discountOff,
        isPercentOff,
        discountOffLabel
    } 
    = getPriceInfo(product);

    //@ts-ignore
    const productId = product?.id || product?._id?.$oid

  return (
    <Link href={`/products/${productId}`}>
        <div className='mb-2 relative group w-36 sm:w-40 lg:w-48 flex flex-col gap-2 bg-white rounded-[2px] transition-all pb-2 overflow-hidden hover:shadow-cardHoverShadow'>
            {
                productOnSale() && showDiscountLabel && (
                    <div className='transition-all absolute bg-rose-500 rounded-tl-sm py-1 px-2 top-0 left-0 z-50'>
                        <p className='text-xs sm:text-sm font-text font-extrabold tracking-wide text-white'>
                            {discountOffLabel}
                        </p>
                    </div>
                )
            }
            <div className='relative h-36 sm:h-40 lg:h-48 overflow-hidden'>
                <ProductImage 
                    src={product.image!}
                    loading='lazy'
                />
            </div>

            <div className='flex flex-col gap-1 px-1 sm:px-2'>
                <h2 className='w-full h-8 text-xs tracking-wide font-text font-semibold overflow-hidden line-clamp-2'>
                    {product?.name?.slice(0, 50)}
                </h2>

                <div>
                    <div className='flex gap-1 sm:gap-2 items-center'>
                        <h2 className='text-sm sm:text-base md:text-lg font-text font-semibold text-blue-600 tracking-wide'>
                            <FormattedCurrency 
                                quantity={priceLabel(productOnSale(), isPercentOff, discountOff(), product?.price) || 0}
                            />
                        </h2>
                        {
                            productOnSale() && (
                                <p className='text-[10px] sm:text-xs font-text font-semibold opacity-75'>
                                    <s>
                                    <FormattedCurrency 
                                        quantity={product.price}
                                    />
                                    </s>
                                </p>
                            )
                        }
                    </div>

                    <div className='flex gap-1 items-center'>
                        <RatingStars 
                            defaultValue={product.avgRating} 
                            size='small'
                        /> 

                        <p className='text-[12px] font-text text-slate-500 font-semibold'>                        
                            { product.avgRating + "/5" }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}
