import { getTotal } from "@/app/utils/getTotal";
import React, { useEffect, useState } from "react";
import { Seperator } from "@/app/components/Seperator";
import { VoucherAppliedPreview } from "./VoucherAppliedPreview";
import { FormatedCartItemType, VoucherType } from "@/app/types";
import { CheckoutItemProductCard } from "./CheckoutItemProductCard";
import { FormattedCurrency } from "@/app/components/FormattedCurrency";
import { Applied_ApplicableVouchers } from "./Applied_ApplicableVouchers";
import { FreeShippingsType } from "../page";

interface CheckoutItemCardProps {
  collectedVouchers: VoucherType[];
  freeShippings: FreeShippingsType;
  checkoutItem: FormatedCartItemType;
  appliedVoucher: VoucherType | undefined;
  setAppliedVouchers: React.Dispatch<
    React.SetStateAction<{
      [key: string]: VoucherType;
    }>
  >;
}

export const CheckoutItemCard: React.FC<CheckoutItemCardProps> = ({
  setAppliedVouchers,
  collectedVouchers,
  appliedVoucher,
  freeShippings,
  checkoutItem,
}) => {
  const [applicableVouchers, setApplicableVouchers] = useState<VoucherType[]>(
    [],
  );

  const { subTotal, freeShippingAvailableStores } = getTotal({
    items: checkoutItem.cartItems,
    appliedVoucher,
    freeShippings,
  });

  useEffect(() => {
    if (subTotal) {
      if (applicableVouchers.length === 0) {
        const applicableVouchersOnThisPackage = collectedVouchers.filter(
          (voucher) => {
            if (voucher.applicableOn === "Entire Store")
              return voucher.minOrderValue <= subTotal;
            else {
              const voucherApplicableCartItems = checkoutItem.cartItems.filter(
                (cartItem) => voucher.productIds.includes(cartItem.product.id),
              );

              const { subTotal } = getTotal({
                items: voucherApplicableCartItems,
              });

              return voucher.minOrderValue <= subTotal;
            }
          },
        );

        setApplicableVouchers(applicableVouchersOnThisPackage);

        setAppliedVouchers((prev) => ({
          ...prev,
          [checkoutItem.storeId]: applicableVouchersOnThisPackage[0],
        }));
      }
    }
  }, [subTotal]);

  // useEffect(() => {
  //   console.log(collectedVouchers);
  // }, [collectedVouchers]);

  const specificProductsVoucher = !!(
    appliedVoucher?.applicableOn === "Specific Products"
  );

  return (
    <div className="w-full bg-white p-2 shadow-md sm:p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="font-roboto text-xs">By:</p>
          <h2 className="font-roboto text-sm">{checkoutItem.storeName}</h2>
        </div>

        <div className="w-full bg-slate-100 p-3">
          {
            <div className="flex flex-col gap-6">
              {checkoutItem.cartItems.map((cartItem, i) => (
                <CheckoutItemProductCard
                  key={i}
                  product={cartItem.product}
                  quantity={cartItem.quantity}
                  selectedCombination={cartItem.selectedCombination}
                  showVoucherPreview={
                    specificProductsVoucher &&
                    appliedVoucher.productIds.includes(cartItem.product.id)
                  }
                />
              ))}
            </div>
          }
        </div>

        <Seperator />

        <div className="flex max-sm:flex-col max-sm:gap-5 sm:justify-between">
          <div className="flex items-center gap-4 max-sm:justify-between">
            <div className="flex flex-col gap-0">
              <div className="flex items-center gap-2">
                <p className="font-roboto text-xs text-slate-600">
                  Shipping Fee:
                </p>
                <p className="font-roboto text-sm">
                  <FormattedCurrency quantity={150} />
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-roboto text-xs text-blue-600">
                  {checkoutItem.cartItems.length + " Item(s) Subtotal:"}
                </p>
                <p className="font-roboto text-sm text-blue-600">
                  <FormattedCurrency quantity={subTotal + 150} />
                </p>
              </div>
            </div>

            {appliedVoucher && (
              <VoucherAppliedPreview
                discountType={appliedVoucher.discountType}
                discountPrice={appliedVoucher.discountOffValue}
              />
            )}
          </div>

          <Applied_ApplicableVouchers
            storeId={checkoutItem.storeId}
            appliedVoucher={appliedVoucher}
            applicableVouchers={applicableVouchers}
            setAppliedVouchers={setAppliedVouchers}
          />
        </div>
      </div>
    </div>
  );
};
