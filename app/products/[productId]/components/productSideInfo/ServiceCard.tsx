import React from 'react'
import { IconType } from 'react-icons'

interface ServiceCardProps {
    Icon : IconType;
    label : string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    Icon,
    label
}) => {
  return (
    <div className='flex gap-3 items-center'>
      <Icon className='w-5 h-5 text-black'/>
      
      <p className='capitalize text-sm font-text text-black'>
        { label }
      </p>
    </div>
  )
}
