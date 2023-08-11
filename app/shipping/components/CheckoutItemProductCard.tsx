import { ProductImage } from '@/app/components/ProductImage'
import { ProductPrice } from '@/app/components/ProductPrice'
import { CartItemProductType, CombinationsType } from '@/app/types'
import { getPriceInfo } from '@/app/utils/getPriceInfo'
import React from 'react'

interface CheckoutItemProductCardProps {
    product : CartItemProductType;
    quantity : number;
    selectedCombination : CombinationsType | null
}

export const CheckoutItemProductCard: React.FC<CheckoutItemProductCardProps> = ({
    product,
    quantity,
    selectedCombination
}) => {

    const {
        productOnSale,
        discountOff,
        isPercentOff,
        discountOffLabel,

    } = getPriceInfo(product);

  return (
    <div className='flex justify-between'>
        <div className='flex gap-4'>
            <div className='relative w-14 h-14 rounded-[2px] overflow-hidden'>
                <ProductImage 
                    src={product.image}
                />
            </div>
            
            <div className='flex flex-col gap-1'>
                <h3 className='text-sm font-text font-medium'>
                    { product.name }
                </h3>

                <p className='text-xs font-text'>
                    {"Qty:"+quantity}
                </p>
            </div>
        </div>

        <div>
            <ProductPrice 
                productOnSale={productOnSale}
                discountOff={discountOff}
                isPercentOff={isPercentOff}
                discountOffLabel={discountOffLabel}
                price={product.price}
                className='text-sm mb-1 font-semibold text-themeSecondary'
                discountLabelsClassName='text-xs'
                mode='flex-col'
            />
        </div>
    </div>
  )
}
