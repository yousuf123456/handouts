import React from 'react'
import Image from "next/image"

interface AvatarProps {
    image : string | undefined | null
}

export const Avatar: React.FC<AvatarProps> = ({
    image
}) => {
  return (
    <Image 
        src={image || "/images/placeholders/placeholder.jpg"}
        alt='Avatar'
        className='object-cover cursor-pointer transition-all hover:opacity-70'
        fill
    />
  )
}
