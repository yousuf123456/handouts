import React, { ReactNode } from 'react'

interface Review_Question {
    children : ReactNode
}

export const Review_Question: React.FC<Review_Question> = ({
    children
}) => {
  return (
    <p className='text-sm font-text font-medium text-black'>
        { children }
    </p>
  )
}
