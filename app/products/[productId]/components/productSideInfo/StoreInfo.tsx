import { CtaLink } from "@/app/(site)/components/CtaLink";
import { Avatar } from "@/app/components/Avatar";
import { format } from "date-fns";
import React from "react";
import { PortionWrapper } from "./PortionWrapper";

interface StoreInfoProps {
  store: {
    ratingsCount: number;
    logo: string | null;
    name: string | null;
    posRatings: number;
    neuRatings: number;
    negRatings: number;
    createdAt: Date;
  };
}

export const StoreInfo: React.FC<StoreInfoProps> = ({ store }) => {
  const avgStorePosRatings = Math.round(
    (store.posRatings! / store.ratingsCount!) * 100,
  );

  return (
    <PortionWrapper portionName="Sold By">
      <div className="flex w-full flex-col items-center rounded-md border-[1px] p-3">
        <div className="relative h-14 w-14 overflow-hidden rounded-full">
          <Avatar image={store?.logo} />
        </div>

        <CtaLink href="">
          <h2 className="font-text font-semibold text-themeSecondary hover:opacity-70">
            {store?.name}
          </h2>
        </CtaLink>

        <div className="mt-4 flex w-full flex-col items-start gap-2">
          <div className="flex w-full flex-col gap-0">
            <p className="text-xs font-semibold">
              {avgStorePosRatings + "% Positive Reviews"}
            </p>
          </div>

          <div className="flex w-full flex-col gap-0">
            <p className="font-text text-xs font-medium text-slate-600">
              Joined On:
            </p>
            <p className="font-text text-sm font-medium text-black">
              {format(store?.createdAt!, "do / MMMM / Y")}
            </p>
          </div>
        </div>

        <CtaLink href="">
          <p className="mt-4 font-text text-sm font-semibold text-themeBlue underline hover:opacity-70">
            Visit Store
          </p>
        </CtaLink>
      </div>
    </PortionWrapper>
  );
};
