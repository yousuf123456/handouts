import { cn } from "@/lib/utils";
import React from "react";
import { FaCheck } from "react-icons/fa";

interface VoucherAppliedPreviewProps {
  discountPrice: number;
  discountType: string;
  withCheck?: boolean;
}

export const VoucherAppliedPreview: React.FC<VoucherAppliedPreviewProps> = ({
  discountPrice,
  discountType,
  withCheck,
}) => {
  const cutterCs =
    "absolute top-1/2 -translate-y-1/2 bg-white rounded-full w-3 h-3 z-[99] border-rose-500";

  return (
    <div className="relative h-fit rounded-sm border-[1px] border-rose-500 px-5 py-1">
      {!withCheck ? (
        <p className="text-xs font-medium leading-none text-rose-500">{`${discountPrice} ${
          discountType === "Money Value" ? " Rs" : " %"
        }`}</p>
      ) : (
        <FaCheck className="h-3 w-3 rounded-full bg-rose-500 py-0.5 text-white" />
      )}

      <div className={cn(cutterCs, "left-0 -translate-x-1/2 border-r-[1px]")} />
      <div className={cn(cutterCs, "right-0 translate-x-1/2 border-l-[1px]")} />
    </div>
  );
};
