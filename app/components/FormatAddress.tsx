import React from 'react'
import { AddressType } from '../types'

interface FormatAddressProps {
    rawAddress : AddressType | undefined;
    className : string;
    prefix? : string;
}

export const FormatAddress: React.FC<FormatAddressProps> = ({
    rawAddress,
    className,
    prefix
}) => {

  return (
    <p className={className}>
        { 
            rawAddress?.address && prefix ? prefix + rawAddress?.address + "-" + rawAddress?.area + "-" + rawAddress?.city + "-" + rawAddress?.province +  "-" + rawAddress?.landmark : rawAddress?.address + "-" + rawAddress?.area + "-" + rawAddress?.city + "-" + rawAddress?.province +  "-" + rawAddress?.landmark 
        }
    </p>
  )
}
