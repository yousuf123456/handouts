import { DialogModel } from "@/app/components/DialogModel";
import Voucher from "@/app/components/Voucher";
import { VoucherType } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface Applied_ApplicableVouchersProps {
  storeId: string;
  appliedVoucher: VoucherType | undefined;
  applicableVouchers: VoucherType[];
  setAppliedVouchers: React.Dispatch<
    React.SetStateAction<{
      [key: string]: VoucherType;
    }>
  >;
}

export const Applied_ApplicableVouchers: React.FC<
  Applied_ApplicableVouchersProps
> = ({ applicableVouchers, appliedVoucher, setAppliedVouchers, storeId }) => {
  const [open, setOpen] = useState(false);

  const onApply = (voucher: VoucherType) => {
    setAppliedVouchers({ [storeId]: voucher });
  };

  return (
    <>
      {appliedVoucher && (
        <div className="flex flex-col items-center gap-2">
          <Badge className="hidden bg-slate-900 font-medium sm:block">
            1 Voucher Applied
          </Badge>

          <div
            onClick={() => setOpen(true)}
            className="flex cursor-pointer items-center justify-center gap-3 bg-slate-800 px-2 py-0.5 font-roboto text-sm font-medium text-white max-sm:w-full"
          >
            See All Applicable Vouchers
            <ChevronDown className="h-4 w-4 text-white" />
          </div>
        </div>
      )}

      <DialogModel open={open} setOpen={setOpen} className="max-sm:px-2">
        <DialogHeader>
          <DialogTitle>All Applicable Vouchers</DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-5">
          {applicableVouchers.map((voucher, i) => (
            <Voucher
              key={i}
              voucher={voucher}
              withAppliedButton
              onApply={onApply}
              isApplied={voucher._id.$oid === appliedVoucher?._id.$oid}
            />
          ))}
        </div>
      </DialogModel>
    </>
  );
};
