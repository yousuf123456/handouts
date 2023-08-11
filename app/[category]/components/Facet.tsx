"use client"

import React, { useState } from 'react'
import { Bucket } from './Bucket';
import clsx from 'clsx';
import { FacetHeader } from './FacetHeader';

interface FacetProps {
    facetName : string;
    facetBuckets : {_id : string, count? : number}[];
}

export const Facet: React.FC<FacetProps> = ({
    facetName,
    facetBuckets
}) => {

    const [collapsed, setIsCollapsed] = useState(false);
    const [isShowingMore, setIsShowingMore] = useState(false);
    
  return (
    <div className='flex flex-col gap-2 lg:gap-0'>
        <FacetHeader 
            facetName={facetName}
            collapsed={collapsed}
            setIsCollapsed={setIsCollapsed}
        />

        <div className={clsx('flex lg:flex-col lg:gap-0 gap-2 flex-wrap', collapsed && "h-0 overflow-hidden")}>
            {
                facetBuckets.map((bucket, i) => {
                    if(!isShowingMore && i > 4) return null
                    return (
                        <Bucket 
                            key={i}
                            bucket={bucket} 
                            queryName={facetName}
                        />
                    )
                })
            }
        </div>

        <div>
            {
                facetBuckets.length > 5 && !collapsed && (
                    <div 
                        className='mt-2 relative left-2.5 w-fit flex flex-col gap-0'
                        onClick={()=> setIsShowingMore((prev)=> !prev)}
                    >
                        <p className='text-sm font-text font-semibold text-themeBlue tracking-wide cursor-pointer peer'>
                            { isShowingMore ? "Show less" : "Show more" }
                        </p>

                        <div className='w-full h-0.5 opacity-0 peer-hover:opacity-100 bg-themeSecondary'/>
                    </div>
                )
            }
        </div>
    </div>
  )
}
