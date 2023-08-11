import React, { ReactNode } from 'react'
import Model from "@mui/material/Modal"

import Image from "next/image"

interface ImageModelProps {
    open : boolean,
    image : string,
    handleClose : any
}

export const ImageModel: React.FC<ImageModelProps> = ({
    open,
    image,
    handleClose
}) => {
  return (
    <Model
        open={open}
    >
        <div onClick={handleClose} className='w-full h-full flex justify-center items-center'>
            <div className='relative w-96 h-96'>
                <Image 
                    src={image}
                    alt='Image'
                    className='object-cover'
                    fill
                />
            </div>
        </div>
    </Model>
  )
}
