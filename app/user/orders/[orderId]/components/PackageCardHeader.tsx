import React from 'react'

import { Button } from '@/app/components/Button';
import { HiChatBubbleLeft } from "react-icons/hi2"
import { GetBy_DelieveredTimeline } from '../../components/GetBy_DelieveredTimeline';

interface PackageCardHeaderProps {
    storeName? : string;
    packageNumber? : number; 
    isDelievered? : boolean;
    delieveredAt? : Date | null;
    hideTimeline? : boolean;
}

export const PackageCardHeader: React.FC<PackageCardHeaderProps> = ({
    storeName,
    isDelievered,
    packageNumber,
    delieveredAt,
    hideTimeline
}) => {
  return (
    <div className='px-2 py-1 w-full flex justify-between items-center bg-white'>
        <div className='flex flex-col gap-0 items-start'>
            <h4 className='text-base font-text font-semibold text-slate-700'> 
                { "Package Number : " + packageNumber }
            </h4>

            <div className='flex gap-2 items-center'>
                <p className='text-xs font-text text-slate-700'>By : </p>
                <p className='text-xs font-text text-blue-500'>{ storeName }</p>
            </div>

            {
                !hideTimeline &&
                <div className='mt-4'>
                    {
                        <GetBy_DelieveredTimeline 
                            createdAt={isDelievered ? delieveredAt : new Date()}
                            isDelievered={isDelievered}
                        />
                    }
                </div>
            }
        </div>

        <Button className='bg-transparent text-themeBlue flex gap-2 items-center hover:bg-transparent hover:text-themeBlue '>
            <HiChatBubbleLeft className='w-5 h-5 text-themeBlue'/>
            Chat With Seller
        </Button>
    </div>
  )
}
