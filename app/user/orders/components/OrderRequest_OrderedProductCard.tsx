import React from "react";

import { FormattedCurrency } from "@/app/components/FormattedCurrency";
import { ProductImage } from "@/app/components/ProductImage";
import {
  CartItemType,
  OrderedProductType,
  cancellationSteps,
  returnSteps,
} from "@/app/types";

import { KeyValuePairInfo } from "./KeyValuePairInfo";
import { Status } from "./Status";

import { Cancel } from "./Cancel";
import { CtaLink } from "@/app/(site)/components/CtaLink";
import { Refund_ReviewCta } from "./Refund_ReviewCta";
import { cn } from "@/app/utils/cn";
import clsx from "clsx";

interface OrderRequest_OrderedProductCardProps {
  orderedProduct: OrderedProductType | CartItemType;
  hideShowMoreDetailsCta?: boolean;
  showOnlyRequestStatus?: boolean;
  showCancelButton?: boolean;
  hideCancelButton?: boolean;
  isDelievered?: boolean;
  reason?: string | null;
  showReason?: boolean;
  hideStatus?: boolean;
  hidePrice?: boolean;
}

export const OrderRequest_OrderedProductCard: React.FC<
  OrderRequest_OrderedProductCardProps
> = ({
  hideShowMoreDetailsCta,
  showOnlyRequestStatus,
  showCancelButton,
  hideCancelButton,
  orderedProduct,
  isDelievered,
  hideStatus,
  showReason,
  hidePrice,
  reason,
}) => {
  // Ordered product with OrderedProductType
  const orderedProductOPT = orderedProduct as OrderedProductType;

  // Ordered product with CartItemProductType
  const orderedProductCIT = orderedProduct as CartItemType;

  //@ts-ignore
  const orderedProductStatus = orderedProduct.status;

  const isCancelled = cancellationSteps.includes(orderedProductStatus);
  const isReturned = returnSteps.includes(orderedProductStatus);

  const cancellationId = orderedProductOPT.cancellationRequestId;
  const returnId = orderedProductOPT.returnRequestId;
  const moreDetailsHref = `/user/${returnId ? "returns" : "cancellations"}/${
    cancellationId || returnId
  }`;

  const showCancelOrderButton =
    !isCancelled && !isReturned && showCancelButton && !hideCancelButton;

  return (
    <div className={"h-full items-start sm:flex sm:justify-between"}>
      <div className="flex h-full items-start gap-4">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm sm:h-[72px] sm:w-[72px] xl:h-20 xl:w-20">
          <ProductImage src={orderedProduct.product.image || ""} />
        </div>

        <div className="flex w-full flex-col gap-1 sm:gap-2 sm:pt-2">
          <h3 className="line-clamp-5 text-xs text-black max-[520px]:font-medium min-[520px]:text-sm min-[520px]:text-slate-800 md:line-clamp-3 md:text-base">
            {orderedProduct.product.name}
          </h3>

          <div className="flex w-full items-start justify-between">
            {/* Only Visible in small devices */}
            <div className="flex flex-shrink-0 flex-col gap-0 sm:hidden">
              {!hidePrice && (
                <p className=" font-text text-sm font-semibold text-themeSecondary">
                  <FormattedCurrency
                    quantity={
                      orderedProductOPT.priceAtOrderTime ||
                      orderedProductCIT.product.price
                    }
                  />
                </p>
              )}

              <p className="font-text text-sm text-slate-600">
                {"x " + orderedProduct.quantity.toString()}
              </p>
            </div>

            {!showReason ? (
              !hideStatus && (
                <div className="mt-1 flex flex-col gap-1 max-sm:items-end">
                  <Status
                    status={orderedProductStatus}
                    showOnlyRequestStatus={showOnlyRequestStatus}
                  />
                  {!hideShowMoreDetailsCta && (isCancelled || isReturned) && (
                    <CtaLink href={moreDetailsHref}>
                      <p className="text-xs font-semibold text-themeBlue">
                        More Details
                      </p>
                    </CtaLink>
                  )}
                </div>
              )
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-xs text-slate-500">Reason</p>
                <p className="text-xs text-black">{reason}</p>
              </div>
            )}

            <div className={clsx("sm:hidden", !showCancelOrderButton && "hidden")}>
              <Cancel
                show={showCancelOrderButton}
                status={orderedProductStatus}
              />
            </div>

            <Refund_ReviewCta
              hasBeenReviewed={orderedProductOPT.hasBeenReviewed}
              productId={orderedProduct.product.id}
              orderedProductId={orderedProduct.id}
              isDelievered={isDelievered}
            />
          </div>

          <div className="hidden sm:block">
            <Cancel
              show={showCancelOrderButton}
              status={orderedProductStatus}
            />
          </div>
        </div>
      </div>

      <div className="hidden flex-shrink-0 items-center gap-6 sm:flex md:gap-16 xl:gap-36">
        {!hidePrice && (
          <div className="flex flex-shrink-0 flex-col items-end gap-2 pt-2">
            <h3 className="font-text text-base font-semibold text-themeSecondary md:text-lg">
              <FormattedCurrency
                quantity={
                  orderedProductOPT.priceAtOrderTime ||
                  orderedProductCIT.product.price
                }
              />
            </h3>
          </div>
        )}

        <div className="pt-2">
          <KeyValuePairInfo
            Key="Qty :"
            value={orderedProduct.quantity.toString()}
          />
        </div>
      </div>

      <div className={cn("hidden sm:block", !isDelievered && "sm:hidden")}>
        <Refund_ReviewCta
          hasBeenReviewed={orderedProductOPT.hasBeenReviewed}
          productId={orderedProduct.product.id}
          orderedProductId={orderedProduct.id}
          isDelievered={isDelievered}
        />
      </div>
    </div>
  );
};
