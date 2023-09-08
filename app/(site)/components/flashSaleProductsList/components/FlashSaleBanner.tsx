import React from "react";
import { CtaLink } from "../../CtaLink";
import { Button } from "@/app/components/Button";

export const FlashSaleBanner = () => {
  return (
    <div className="rounded-sm bg-rose-500 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-0">
          <h2 className="font-heading text-sm font-semibold tracking-wide text-white sm:text-base md:text-base lg:text-lg lg:tracking-wider">
            Flash Sale
          </h2>

          <div className="block sm:hidden">
            <CtaLink href="">
              <p className="font-text text-xs font-semibold text-black underline">
                Explore All
              </p>
            </CtaLink>
          </div>
        </div>

        <div className="flex flex-col items-start gap-0 sm:flex-row sm:items-center sm:gap-4 lg:gap-6">
          <h3 className="font-text text-sm font-semibold text-white sm:text-base md:text-base md:tracking-wide lg:text-lg">
            Ending In
          </h3>
          <p className="font-text text-xs font-bold sm:text-lg md:text-xl lg:text-2xl">
            12 : 56 : 54
          </p>
        </div>

        <div className="hidden sm:block">
          <Button className="h-8 bg-black font-text text-white hover:bg-slate-800 md:h-9">
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};
