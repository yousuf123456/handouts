import React, { ReactNode } from 'react'

interface NoQuestions_ReviewsMessageProps {
    children : ReactNode
}

export const NoQuestions_ReviewsMessage: React.FC<NoQuestions_ReviewsMessageProps> = ({
    children
}) => {
  return (
    <h1 className='text-lg text-center text-slate-600 font-heading font-semibold'>
        { children }
    </h1>
  )
}
