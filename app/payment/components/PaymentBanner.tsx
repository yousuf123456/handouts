import React from "react";

import { NavigationItem } from "@/app/components/NavigationItem";
import { FaCheckCircle } from "react-icons/fa";
import { HiCash } from "react-icons/hi";
import { RiWalletFill } from "react-icons/ri";
import { OrderSummary } from "./OrderSummary";
import { BannerNavPanel } from "@/app/(site)/components/header/components/BannerNavPanel";

export const PaymentBanner = () => {
  return (
    <div className="flex h-[340px] w-full flex-col justify-center gap-6 bg-slate-900 px-4 min-[420px]:px-8 sm:h-72">
      <BannerNavPanel heading="Payment" onBackHref="/" />

      <div className="mt-2 flex items-center justify-center gap-0 sm:mt-4">
        <NavigationItem
          Icon={RiWalletFill}
          className="bg-purple-600"
          lineClassName="from-purple-600 to-rose-600"
          label="From Checkout"
        />
        <NavigationItem
          Icon={HiCash}
          className="bg-rose-600"
          lineClassName="from-rose-600 to-green-600"
          label="To Payment"
          isSelected={true}
        />
        <NavigationItem
          Icon={FaCheckCircle}
          className="bg-green-500"
          label="Next Success"
          isLast={true}
        />
      </div>

      <div className="mt-4 flex w-full justify-center">
        <OrderSummary total={1300} totalQuantity={5} />
      </div>
    </div>
  );
};
