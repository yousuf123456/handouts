import React from 'react'
import { PortionWrapper } from './PortionWrapper'
import { RiArrowGoBackFill, RiCashLine, RiShieldCheckLine } from 'react-icons/ri'

import { FaShieldAlt } from "react-icons/fa" 
import { ServiceCard } from './ServiceCard'

export const Services = () => {
  return (
    <PortionWrapper
        portionName='Services'
    >
        <div className='p-3 bg-slate-100 flex flex-col gap-3'>
            <ServiceCard 
                Icon={RiArrowGoBackFill}
                label='7 Days Return'
            />

            <ServiceCard 
                Icon={RiShieldCheckLine}
                label='1 year warranty'
            />

            <ServiceCard 
                Icon={RiCashLine}
                label='cash on delievery'
            />
        </div>
    </PortionWrapper>
  )
}
