import { CtaLink } from '@/app/(site)/components/CtaLink';
import { Button } from '@/app/components/Button';
import React from 'react'

interface ReviewCtaProps {
    storeName : string;
    productId : string;
    isHistory : boolean;
    orderedProductId : string;
}

export const ReviewCta: React.FC<ReviewCtaProps> = ({
    storeName,
    productId,
    isHistory,
    orderedProductId
}) => {

    const searchParams = `orderedProductId=${orderedProductId}&productId=${productId}&isHistory=${isHistory}`

  return (
    <div className='pt-2 flex-shrink-0 w-48 flex flex-col justify-between'>
        <div className='flex gap-2 items-center'>
            <p className='flex-shrink-0 text-xs font-text text-slate-500'>
                Sold By
            </p>

            <p className='font-text text-sm text-themeBlue line-clamp-1'>
                {
                    storeName
                }
            </p>
        </div>
            
        <CtaLink href={`/user/myReviews/write-review?${searchParams}`}>
            <div className='w-full flex justify-center'>
                <Button variant="outline" className='w-full h-8 flex items-center justify-center'>
                    Review
                </Button>
            </div>
        </CtaLink>
    </div>
  )
}
