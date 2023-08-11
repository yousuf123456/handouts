import { FormattedCurrency } from '@/app/components/FormattedCurrency';
import clsx from 'clsx';
import React from 'react'

interface OrderSummaryInfoProps {
    Key : string;
    value : number;
    isTotal : boolean;
}

export const OrderSummaryInfo: React.FC<OrderSummaryInfoProps> = ({
    isTotal,
    value,
    Key,
}) => {
  return (
    <div className={clsx('flex items-center', isTotal ? 'gap-[264px]' : 'gap-[256px]')}>
        <p className={clsx('font-text font-semibold', isTotal ? "text-base text-black" : "text-sm text-slate-500")}>
            { Key }
        </p>

        <p className={clsx('font-text font-semibold', isTotal ? "text-base text-black" : "text-sm text-slate-700")}>
            <FormattedCurrency
                quantity={value}
            />
        </p>
    </div>
  )
}
