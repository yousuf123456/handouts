import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

interface SuccessBannerProps {
  type : "Cancellation" | "Return"
  process : "pending" | "completed"
}

export const SuccessBanner: React.FC<SuccessBannerProps> = ({
  type,
  process
}) => {
  return (
    <div className='w-full flex justify-center'>
      <div className='p-6 flex gap-4 items-center rounded-sm bg-green-500'>
        <FaCheckCircle className='w-8 h-8 text-white'/>

        <h1 className='text-xl font-semibold text-white'>
          {
            process === "completed" ?
            "Your request to cancel order was successfull"
            : "Your request has been submitted. We will let you know about the " + (type === "Cancellation" ? "cancellation" : "return") + " updates"
          }
        </h1>
      </div>
    </div>
  )
}
