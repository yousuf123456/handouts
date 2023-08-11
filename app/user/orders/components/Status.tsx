import { StatusType } from '@/app/types'
import clsx from 'clsx'
import React from 'react'

export const Status = ({ status, showOnlyCancelStatus }: { status : StatusType, showOnlyCancelStatus? : boolean }) => {

  const styles = {
    "Payment Pending" : "bg-yellow-100 text-yellow-500",
    "Processing" : "bg-pink-100 text-pink-500",
    "Shipped" : "bg-blue-100 text-blue-500",
    "Delievered" : "bg-green-100 text-green-500",
    "Cancelled" : "bg-red-100 text-red-500",
    "Cancellation in Process" : "bg-pink-100 text-pink-500",
    "Return in Process" : "bg-pink-100 text-pink-500",
  }

  return (
    <>
    {
      showOnlyCancelStatus ? (
        status === "Cancelled" || status === "Cancellation in Process" && 
        <div className={clsx('w-fit h-fit px-3 py-1 rounded-md', styles[status])}>
          <p className='text-xs font-medium'>
            { status }
          </p>
        </div>

      ):
      (
      <div className={clsx('w-fit h-fit px-3 py-1 rounded-md', styles[status])}>
        <p className='text-xs font-medium'>
          { status }
        </p>
      </div>
      )
    }
    </>
  )
}
