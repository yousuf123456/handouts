import React from 'react'
import { priceLabel } from '../utils/priceLabel';
import clsx from 'clsx';
import { FormattedCurrency } from './FormattedCurrency';

interface ProductPriceProps {
    productOnSale : ()=>boolean;
    discountOff : ()=>number | null | undefined;
    isPercentOff : boolean | null | undefined;
    price : number | undefined;
    discountOffLabel : any;
    className? : string;
    discountLabelsClassName? : string;
    mode? : "flex-col"
}

export const ProductPrice: React.FC<ProductPriceProps> = ({
    productOnSale,
    discountOff,
    isPercentOff,
    price,
    discountOffLabel,
    className,
    discountLabelsClassName,
    mode
}) => {
  return (
    <div className='flex flex-col gap-0'>
        <h1 className={clsx('text-3xl font-heading font-medium text-themeBlue', mode && "w-full flex justify-end", className)}>
            <FormattedCurrency 
                quantity={priceLabel(productOnSale(), isPercentOff, discountOff(), price)}
            />
        </h1>
        {
            productOnSale() && (
                <div className={clsx('flex', mode ? "flex-col items-end gap-0" : "gap-2")}>
                    <p className={clsx('text-sm font-text font-bold text-slate-600', discountLabelsClassName)}>
                        <s>
                            <FormattedCurrency 
                                quantity={ price! }
                            />  
                        </s>
                    </p>

                    <p className={clsx('text-sm font-text font-bold text-red-600', discountLabelsClassName)}>
                        { discountOffLabel } 
                    </p>
                </div>
            )
        }
    </div>
  )
}
