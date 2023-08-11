import clsx from 'clsx'
import React from 'react'
import { HiChevronDown } from 'react-icons/hi2'

interface FacetHeaderProps {
    facetName : string,
    collapsed : boolean,
    setIsCollapsed : React.Dispatch<React.SetStateAction<boolean>>
}

export const FacetHeader: React.FC<FacetHeaderProps> = ({
    facetName,
    collapsed,
    setIsCollapsed
}) => {
  return (
    <div className='flex justify-between items-center'>
        <h3 className='text-base lg:text-lg capitalize font-text font-semibold text-themeSecondary tracking-wider'>
            { facetName }
        </h3>

        <HiChevronDown 
            className={clsx('w-4 h-4 lg:w-5 lg:h-5 font-bold text-slate-900 cursor-pointer', collapsed && "rotate-180")}
            onClick={()=> setIsCollapsed((prev) => !prev)}
        />
    </div>
  )
}
