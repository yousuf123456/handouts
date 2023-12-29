import Voucher from "@/app/components/Voucher";
import { collectVoucher } from "@/app/serverActions/collectVoucher";
import { VoucherType } from "@/app/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Section } from "./containers/Section";
import { cn } from "@/lib/utils";

interface PromotionsProps {
  initialVouchers: VoucherType[];
  productId: string;
}

export const Promotions: React.FC<PromotionsProps> = ({
  initialVouchers,
  productId,
}) => {
  const session = useSession();
  const [vouchers, setVouchers] = useState(initialVouchers);

  if (initialVouchers.length === 0) return;

  const onCollectVoucher = async (voucher: VoucherType) => {
    if (session.status === "unauthenticated")
      return toast.error("Please Login to Collect Voucher");

    if (!voucher) return;

    const resp = await collectVoucher({
      stringifiedVoucher: JSON.stringify(voucher),
    });

    if (resp === "Collected Voucher Succesfully") {
      setVouchers((prev) =>
        prev.map((prevVoucher) => {
          if (prevVoucher._id.$oid === voucher._id.$oid) {
            return {
              ...prevVoucher,
              usedBy: [...prevVoucher.usedBy, session.data?.user?.id!],
            };
          }

          return prevVoucher;
        }),
      );
    }

    return resp;
  };

  if (session.status === "loading") return;
  return (
    <div>
      <div className="sm:hidden">
        <Section mode="full" variant="differentiate">
          <div
            className={cn(
              "flex max-w-full grid-rows-1 gap-6 overflow-x-auto overflow-y-hidden scrollbar-none",
              vouchers.length === 1 && "min-[420px]:justify-center",
            )}
          >
            {vouchers.map((voucher, i) => (
              <div key={i} className="w-96 flex-shrink-0">
                <Voucher
                  voucher={voucher}
                  onCollectVoucher={onCollectVoucher}
                />
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="hidden gap-2 max-xl:flex-col sm:flex xl:items-center xl:gap-4">
        <h3 className="min-w-[80px] font-roboto text-xs sm:text-sm">
          Discount Vouchers :
        </h3>

        <Popover>
          <PopoverTrigger>
            <div className="flex w-fit items-center gap-3 rounded-sm bg-blue-700 px-3 py-1">
              <p className="font-roboto text-sm font-medium text-white">
                See All Discount Vouchers
              </p>

              <ChevronDown className="h-5 w-5 text-white" />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="absolute left-0 max-h-96 w-[420px] -translate-x-1/2 overflow-y-auto scrollbar-none"
            side="bottom"
            // sticky="always"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                {vouchers.map((voucher, i) => (
                  <Voucher
                    key={i}
                    voucher={voucher}
                    onCollectVoucher={onCollectVoucher}
                  />
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
