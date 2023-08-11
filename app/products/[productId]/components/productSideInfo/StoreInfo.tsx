import { CtaLink } from '@/app/(site)/components/CtaLink'
import { Avatar } from '@/app/components/Avatar'
import { format } from 'date-fns'
import React from 'react'
import { PortionWrapper } from './PortionWrapper'

interface StoreInfoProps {
    store : {
        ratingsCount : number,
        logo : string | null,
        name : string | null,
        posRatings : number,
        neuRatings : number,
        negRatings : number,
        createdAt : Date
    }
}

export const StoreInfo: React.FC<StoreInfoProps> = ({
    store
}) => {

    const avgStorePosRatings = (store.posRatings! / store.ratingsCount!) * 100

  return (

    <PortionWrapper
        portionName='Sold By'
    >
        <div className='w-full p-3 bg-slate-100 flex flex-col items-center'>
            <div className='relative w-14 h-14 rounded-full overflow-hidden'>
                <Avatar image={store?.logo} />
            </div>

            <CtaLink href=''>
                <h2 className='font-text font-semibold hover:opacity-70 text-themeSecondary'>
                    { store?.name }
                </h2>
            </CtaLink>

            <div className='mt-4 w-full flex flex-col gap-2 items-start'>
                <div className='w-full flex flex-col gap-0'>
                    <p className='text-xs font-semibold'>
                        { avgStorePosRatings + "% Positive Reviews" }
                    </p>
                </div>

                <div className='w-full flex flex-col gap-0'>
                    <p className='text-xs font-text font-medium text-slate-600'>
                        Joined On:
                    </p>
                    <p className='text-sm font-text font-medium text-black'>
                        { format(store?.createdAt!, "do / MMMM / Y")  }
                    </p>
                </div>
            </div>

            <CtaLink href=''>
                <p className='mt-4 text-sm font-text font-semibold text-themeBlue hover:opacity-70 underline'>
                    Visit Store
                </p>
            </CtaLink>
        </div>
    </PortionWrapper>
  )
}
