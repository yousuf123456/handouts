import React from 'react'

import { FormattedCurrency } from '@/app/components/FormattedCurrency'
import { ProductImage } from '@/app/components/ProductImage'
import { CartItemType, OrderedProductType, StatusType, ReturnStatusType } from '@/app/types'
import { KeyValuePairInfo } from './KeyValuePairInfo'
import { Status } from './Status'

import clsx from 'clsx'
import { Cancel } from './Cancel'
import { CtaLink } from '@/app/(site)/components/CtaLink'
import { Refund_ReviewCta } from './Refund_ReviewCta'

interface OrderRequest_OrderedProductCardProps {
    orderedProduct : OrderedProductType | CartItemType;
    hideShowMoreDetailsCta? : boolean;
    showOnlyCancelStatus? : boolean;
    showCancelButton? : boolean;
    hideCancelButton? : boolean;
    isDelievered? : boolean;
    reason? : string | null;
    showReason? : boolean;
    hideStatus? : boolean;
    hidePrice? : boolean;
}

export const OrderRequest_OrderedProductCard: React.FC<OrderRequest_OrderedProductCardProps> = ({
    hideShowMoreDetailsCta,
    showOnlyCancelStatus,
    showCancelButton,
    hideCancelButton,
    orderedProduct,
    isDelievered,
    hideStatus,
    showReason,
    hidePrice,
    reason
}) => {
    
    // Ordered product with OrderedProductType
    const orderedProductOPT = orderedProduct as OrderedProductType

    // Ordered product with CartItemProductType
    const orderedProductCIT = orderedProduct as CartItemType
    
    //@ts-ignore
    const orderedProductStatus = orderedProduct.status

    const isCancelled = orderedProductStatus === "Cancelled" || orderedProductStatus === "Cancellation in Process"
    const isReturned = [
        "Return in Process",
        "Approved",
        "Rejected",
        "Refund Pending",
        "Refunded"
    ].includes(orderedProductStatus);

    const cancellationId = orderedProductOPT.cancellationRequestId;
    const returnId = orderedProductOPT.returnRequestId;
    const moreDetailsHref = `/user/${returnId ? "returns" : "cancellations"}/${cancellationId || returnId}`

  return (
    <div className={clsx('w-full h-20 flex items-start justify-between')}>
        <div className='h-full flex gap-4 items-start'>
            <div className='relative h-full w-20 rounded-sm overflow-hidden'>
                <ProductImage 
                    src={orderedProduct.product.image || ""}
                />
            </div>

            <div className='pt-2 flex flex-col gap-2'>
                <h3 className='text-base font-text text-slate-800 line-clamp-2'>
                    { orderedProduct.product.name }
                </h3>
                
                {
                    !showReason ? (!hideStatus &&
                        <div className='flex gap-2 items-center'>
                            <Status
                                status={orderedProductStatus} 
                                showOnlyCancelStatus={showOnlyCancelStatus}
                            />
                            {
                                !hideShowMoreDetailsCta && (isCancelled || isReturned) && 
                               <CtaLink href={moreDetailsHref}>
                                    <p className='text-sm font-semibold text-themeBlue'>More Details</p>
                                </CtaLink>
                            }
                        </div>
                    ): (
                        <div className='flex gap-2 items-center'>
                            <p className='text-xs text-slate-500'>
                                Reason 
                            </p>
                            <p className='text-xs text-black'>
                                { reason }
                            </p>
                        </div>
                    )
                }

                <Cancel
                    show={showCancelButton && !hideCancelButton}
                    status={orderedProductStatus}
                />
            </div>
        </div>

        <div className='flex-shrink-0 flex items-center gap-48'>
            {
                !hidePrice &&
                <div className='pt-2 flex-shrink-0 flex flex-col items-end gap-2'>
                    <h3 className='text-lg font-text font-semibold text-themeSecondary'>
                        <FormattedCurrency 
                            quantity={orderedProductOPT.priceAtOrderTime || orderedProductCIT.product.price}
                        />
                    </h3>
                </div>
            }

            <div className='pt-2'>
                <KeyValuePairInfo 
                    Key='Qty :'
                    value={orderedProduct.quantity.toString()}
                />
            </div>
        </div>
        
        <Refund_ReviewCta 
            hasBeenReviewed={orderedProductOPT.hasBeenReviewed}
            productId={orderedProduct.product.id}
            orderedProductId={orderedProduct.id}
            isDelievered={isDelievered}
        />
    </div>
  )
}
