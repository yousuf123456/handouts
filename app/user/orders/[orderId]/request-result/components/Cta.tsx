import { CtaLink } from '@/app/(site)/components/CtaLink'
import { Button } from '@/app/components/Button'
import React from 'react'

interface CtaProps {
    type : "Cancellation" | "Return"
    requestId : string;
}

export const Cta: React.FC<CtaProps> = ({
    type,
    requestId
}) => {

    const cancellationHref = `/user/cancellations/${requestId}`
    const returnHref = `/user/returns/${requestId}`

  return (
    <div className='w-full flex justify-center'>
        <CtaLink href={type === "Cancellation" ? cancellationHref : returnHref}>
            <Button size="lg">
                See More Details
            </Button>
        </CtaLink>
    </div>
  )
}
