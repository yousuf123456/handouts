"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { VoucherType } from "@/app/types";
import { LinearProgress } from "@mui/material";
import { getVoucherInfo } from "../utils/getVoucherInfo";
import { Button } from "@/components/ui/button";
import { Copy, Loader2 } from "lucide-react";

import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";

interface VoucherProps {
  isApplied?: boolean;
  voucher: VoucherType;
  thickVersion?: boolean;
  withAppliedButton?: boolean;
  onApply?: (voucher: VoucherType) => void;
  onCollectVoucher?: (voucher: VoucherType) => Promise<string | undefined>;
}

export default function Voucher({
  voucher,
  onApply,
  isApplied,
  thickVersion,
  onCollectVoucher,
  withAppliedButton,
}: VoucherProps) {
  const [loading, setIsLoading] = useState(false);

  const sideCylindersCs =
    "absolute top-0 h-8 w-8 -translate-y-1/2 z-50 rounded-full bg-white";

  const isDiscountOff = voucher?.discountType === "Percentage Value";

  const discountLabel = isDiscountOff
    ? `${voucher.discountOffValue} % Off On Min Spend ${voucher.minOrderValue} Rupees`
    : `${voucher?.discountOffValue} Rs Off On Min Spend ${voucher?.minOrderValue} Rupees`;

  const startingDate = new Date(voucher?.startingDate.$date);
  const endingDate = new Date(voucher?.endingDate.$date);

  const { voucherUsagePer, hasCollectionStarted } = getVoucherInfo(voucher);

  const collectVoucher = async () => {
    if (!onCollectVoucher) return;
    setIsLoading(true);

    //@ts-ignore
    const bucketId = voucher.bucketId;

    const res = await onCollectVoucher(voucher);

    setIsLoading(false);
    if (res === "Collected Voucher Succesfully")
      return toast.success(
        "Collected Voucher. Voucher will be applied automatically while checkout",
      );

    if (typeof res === "string") toast.error(res || "");
  };

  const { data } = useSession();

  const hasBeenCollected = voucher.usedBy.includes(data?.user?.id || "");

  const buttonsCs =
    "flex items-center gap-2 bg-white border-none text-black hover:bg-white max-sm:px-2 max-sm:h-9";

  const CheckCs =
    "sm:h-4 h-[14px] w-[14px] sm:w-4 rounded-full bg-themeBlue p-0.5 text-white";

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-2xl  flex-col">
        <div
          className={cn(
            "h-full rounded-t-md bg-blue-100 px-4 py-2",
            thickVersion && "px-6 py-4",
          )}
        >
          <div className="flex h-full flex-col justify-between gap-6">
            <h2 className=" font-text font-semibold text-themeSecondary">
              {discountLabel}
            </h2>

            <div className="flex justify-between">
              <div className="flex flex-col gap-0">
                <h4
                  className={cn(
                    "font-roboto text-xs leading-none text-black",
                    thickVersion && "sm:text-sm",
                  )}
                >
                  Valid From:
                </h4>
                <h4
                  className={cn(
                    "font-roboto text-xs leading-5 text-black",
                    thickVersion && "sm:text-sm",
                  )}
                >
                  {format(startingDate, "yyyy-M-d") +
                    " / " +
                    format(endingDate, "yyyy-M-d")}
                </h4>
              </div>

              <div className="flex flex-col gap-0">
                <h4
                  className={cn(
                    "font-roboto text-xs leading-none text-black",
                    thickVersion && "sm:text-sm",
                  )}
                >
                  {voucher.totalVouchers - voucher.vouchersUsed} Remaining
                </h4>

                <h4
                  className={cn(
                    "font-roboto text-xs leading-5 text-black",
                    thickVersion && "sm:text-sm",
                  )}
                >
                  {voucher.vouchersUsed} Vouchers Used
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-fit rounded-b-md bg-blue-500 text-white">
          <div className={cn(sideCylindersCs, "left-0 -translate-x-1/2")} />

          <LinearProgress
            color="inherit"
            variant="determinate"
            value={voucherUsagePer}
            sx={{ bgcolor: "#2563eb" }}
          />

          <div className={cn(sideCylindersCs, "right-0 translate-x-1/2")} />

          <div className="flex h-full items-center justify-between px-4 py-2">
            {voucher.voucherType === "Voucher Code" && (
              <p className="-text text-[15px] font-semibold leading-5 text-white">
                Code : {voucher?.voucherCode || " HURRY_UP"}
              </p>
            )}

            {voucher.voucherType === "Collectible Voucher" ? (
              withAppliedButton ? (
                <div className="flex w-full justify-end">
                  <Button
                    size={"sm"}
                    onClick={() => onApply && onApply(voucher)}
                    className={cn(
                      buttonsCs,
                      isApplied && "pointer-events-none",
                    )}
                  >
                    {isApplied ? "Applied" : "Apply"}
                    {isApplied && <FaCheck className={CheckCs} />}
                  </Button>
                </div>
              ) : (
                <div className="flex w-full justify-end">
                  {hasCollectionStarted ? (
                    <Button
                      size={"sm"}
                      onClick={collectVoucher}
                      className={cn(
                        buttonsCs,
                        hasBeenCollected && "pointer-events-none",
                      )}
                    >
                      {hasBeenCollected ? "Collected" : "Collect"}
                      {hasBeenCollected && <FaCheck className={CheckCs} />}
                      {loading && (
                        <Loader2 className="h-4 w-4 animate-spin text-black" />
                      )}
                    </Button>
                  ) : (
                    <div className="flex flex-col items-center gap-0">
                      <p className="text-sm text-white">
                        Collection Starting From
                      </p>
                      <p className="text-sm text-white">
                        {format(
                          new Date(voucher.collectStartDate.$date),
                          "dd-MMM-yyyy",
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )
            ) : (
              <CopyToClipboard
                text={voucher?.voucherCode || "HURRY_UP"}
                // onCopy={() => setCopied(true)}
              >
                <Copy className="h-4 w-4 cursor-pointer text-white opacity-90 transition-opacity hover:opacity-100" />
              </CopyToClipboard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
