import React from "react";
import { FreeShippingType } from "@/app/types";
import { cn } from "@/lib/utils";
import { FaShippingFast } from "react-icons/fa";
import { TruckIcon } from "lucide-react";
import format from "date-fns/format";
import { Section } from "./containers/Section";

interface FreeShippingProps {
  freeShipping: FreeShippingType | undefined;
}

export const FreeShipping: React.FC<FreeShippingProps> = ({ freeShipping }) => {
  if (!freeShipping) return;

  const labelsContainerCs = "px-4 py-[3px]";

  const labelsCs =
    "font-roboto uppercase font-medium font-semibold tracking-widest text-xs sm:text-[13px] sm:leading-4 text-white";

  return (
    <Section mode="full" variant="differentiate">
      <div className="flex justify-start">
        <div className="flex gap-1 max-xl:flex-col xl:items-start xl:gap-2">
          <div className="flex xl:flex-col xl:items-end">
            <div
              className={cn(
                labelsContainerCs,
                "relative rounded-tl-lg bg-blue-950",
              )}
            >
              <p className={labelsCs}>Free</p>
            </div>
            <div
              className={cn(
                labelsContainerCs,
                "rounded-br-lg bg-themeBlue xl:rounded-bl-lg",
              )}
            >
              <p className={labelsCs}>Delievery</p>
            </div>
          </div>

          <div className="flex flex-col gap-0">
            {freeShipping.condition === "Min Order Value" && (
              <p className="font-roboto text-base capitalize text-black">
                Enjoy free shipping on min spend {freeShipping.minOrderValue}
              </p>
            )}

            <div className="flex gap-2">
              <p className="font-roboto text-sm text-black opacity-70 sm:text-base">
                Avalaible Till:
              </p>
              <p className="font-roboto text-sm text-black sm:text-base">
                {format(
                  new Date(freeShipping.startingDate.$date),
                  "dd-MM-yyyy",
                ) +
                  " To " +
                  format(new Date(freeShipping.endingDate.$date), "dd-MM-yyyy")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
