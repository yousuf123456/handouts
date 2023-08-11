import React from 'react'
import { HiChevronRight } from "react-icons/hi"

interface BreadCrumbs {
    crumbs : string[]
}

export const BreadCrumbs: React.FC<BreadCrumbs> = ({
    crumbs
}) => {
  return (
    <div className='flex gap-1 items-center'>
        {
            crumbs.map((crumb, i)=> (
                <div key={i} className='flex gap-1 items-center'>
                    <p className='text-xs text-slate-600'>
                        { crumb }
                    </p>

                    {
                        i+1 !== crumbs.length &&
                        <HiChevronRight className='w-5 h-5 text-slate-300' />
                    }
                </div>
            ))
        }
    </div>
  )
}
