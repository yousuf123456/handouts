import React from "react";

import { Button } from "@/app/components/Button";
import { HiChatBubbleLeft } from "react-icons/hi2";
import { GetBy_DelieveredTimeline } from "../../components/GetBy_DelieveredTimeline";
import { Status } from "../../components/Status";
import { StatusType } from "@/app/types";
import { Seperator } from "@/app/components/Seperator";

interface PackageCardHeaderProps {
  storeName?: string;
  packageNumber?: number;
  isDelievered?: boolean;
  hideTimeline?: boolean;
  delieveredAt?: Date | null;
  packageStatus: StatusType;
}

export const PackageCardHeader: React.FC<PackageCardHeaderProps> = ({
  packageStatus,
  isDelievered,
  packageNumber,
  delieveredAt,
  hideTimeline,
  storeName,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col items-start gap-0">
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-0">
              <h4 className="font-text text-[13px] font-semibold leading-5 text-slate-700 sm:text-sm md:text-base">
                {"Package Number : " + packageNumber}
              </h4>

              <div className="flex items-center gap-2">
                <p className="font-text text-xs text-slate-700">By : </p>
                <p className="font-text text-xs text-blue-500">{storeName}</p>
              </div>
            </div>

            <div className="md:hidden ">
              <Status status={packageStatus} />
            </div>
          </div>

          {!hideTimeline && (
            <div className="mt-2 md:mt-3 lg:mt-4">
              {
                <GetBy_DelieveredTimeline
                  createdAt={isDelievered ? delieveredAt : new Date()}
                  isDelievered={isDelievered}
                />
              }
            </div>
          )}
        </div>
        <Button className="hidden items-center gap-2 bg-transparent text-themeBlue hover:bg-transparent hover:text-themeBlue md:flex">
          <HiChatBubbleLeft className="h-4 w-4 text-themeBlue md:h-5 md:w-5" />
          Chat With Seller
        </Button>
      </div>

      <Seperator />
    </div>
  );
};
