import React, { Fragment, useState } from "react";

import { Section } from "./containers/Section";
import { HiChevronRight } from "react-icons/hi";
import { SectionHeading } from "./SectionHeading";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import clsx from "clsx";
import dynamic from "next/dynamic";

const Drawer = dynamic(() => import("@/app/components/Drawer"));

interface ProductSpecificationsProps {
  productAttributes: {
    [key: string]: any;
  };
}

export const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
  productAttributes,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Section mode="full" variant="differentiate">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <SectionHeading>Specifications</SectionHeading>
          <p className="line-clamp-1 font-text text-xs capitalize text-black">
            {Object.keys(productAttributes).map((key) => (
              <Fragment key={key}>{key + ", "}</Fragment>
            ))}
          </p>
        </div>

        <HiChevronRight
          className={clsx(
            "h-4 w-4 text-slate-700 transition-all",
            open && "rotate-180",
          )}
        />
      </div>

      <Drawer
        className="max-h-[85%] overflow-y-auto scrollbar-thin scrollbar-track-neutral-100 scrollbar-thumb-neutral-300"
        side="bottom"
        open={open}
        setOpen={setOpen}
      >
        <SheetHeader>
          <SheetTitle>Product Specifications</SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <div className="flex flex-col gap-3">
            {Object.keys(productAttributes).map((key) => (
              <div key={key} className="flex flex-col gap-0">
                <p className=" text-sm font-medium capitalize text-black">
                  {key}
                </p>

                <div className="ml-2 flex items-center gap-2">
                  <div className="h-[5px] w-[5px] bg-slate-600" />

                  <p className="text-xs text-neutral-600">
                    {Array.isArray(productAttributes[key])
                      ? productAttributes[key].join(", ")
                      : productAttributes[key]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </Section>
  );
};
