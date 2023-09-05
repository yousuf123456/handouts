import { CombinationsType, VariantsType } from "@/app/types";
import clsx from "clsx";
import React, { Fragment, useState } from "react";

import { ProductImage } from "@/app/components/ProductImage";
import { Section } from "./containers/Section";
import { HiChevronRight } from "react-icons/hi";
import { Drawer } from "@/app/components/Drawer";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ProductVariantsValues } from "./ProductVariantsValues";
import { Seperator } from "@/app/components/Seperator";
import { ProductQuantity } from "./ProductQuantity";
import { ProductPrice } from "@/app/components/ProductPrice";

interface ProductVariantsProps {
  discountOffLabel: any;
  quantity: number;
  price: number | undefined;
  productOnSale: () => boolean;
  productPicture: string | null;
  variants: VariantsType | undefined;
  isPercentOff: boolean | null | undefined;
  selectedVariantPicture: string | undefined;
  discountOff: () => number | null | undefined;
  selectedCombination: CombinationsType | undefined;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  changeCombination: (variant: string, value: string, images: string[]) => void;
  setSelectedVariantPicture: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ProductVariants: React.FC<ProductVariantsProps> = ({
  productOnSale,
  discountOff,
  isPercentOff,
  discountOffLabel,
  price,
  variants,
  quantity,
  setQuantity,
  productPicture,
  changeCombination,
  selectedCombination,
  selectedVariantPicture,
  setSelectedVariantPicture,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {variants && (
        <div>
          <div className="hidden sm:block">
            <ProductVariantsValues
              variants={variants}
              changeCombination={changeCombination}
              selectedCombination={selectedCombination}
              setSelectedVariantPicture={setSelectedVariantPicture}
            />
          </div>

          <div className="sm:hidden">
            <Section mode="full">
              <div
                onClick={() => setOpen((prev) => !prev)}
                className="flex cursor-pointer flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <p className="font-text text-sm text-slate-700">Variants</p>

                    <p className="text-xs capitalize text-black">
                      {Object.keys(selectedCombination?.combination || {}).map(
                        (key) => (
                          <Fragment key={key}>
                            {`${key}-${selectedCombination?.combination[key]}, `}
                          </Fragment>
                        ),
                      )}
                    </p>
                  </div>

                  <HiChevronRight
                    className={clsx(
                      "h-4 w-4 text-slate-500 transition-all",
                      open && "rotate-180",
                    )}
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  {Object.keys(variants["color"]).map((key) => {
                    if (key === "title") return;
                    return variants["color"][key]?.images?.map(
                      (img: string) => (
                        <div
                          key={img}
                          className={clsx(
                            "relative h-9 w-9",
                            selectedCombination?.combination["color"] ===
                              variants["color"][key].title &&
                              "border-2 border-themeBlue",
                          )}
                        >
                          <ProductImage src={img} />
                        </div>
                      ),
                    );
                  })}
                </div>
              </div>
            </Section>
          </div>

          <Drawer side="bottom" open={open} setOpen={setOpen}>
            <SheetHeader>
              <SheetTitle>Product Variant</SheetTitle>
            </SheetHeader>

            <div className="mt-4 flex flex-col gap-4 px-4">
              <div className="flex items-start gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-md">
                  <ProductImage
                    src={selectedVariantPicture || productPicture}
                  />
                </div>

                <ProductPrice
                  price={price}
                  discountOff={discountOff}
                  isPercentOff={isPercentOff}
                  productOnSale={productOnSale}
                  discountOffLabel={discountOffLabel}
                  containerCs="flex-col max-sm:items-start"
                />
              </div>

              <Seperator />

              <div className="flex max-h-72 flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-track-neutral-100 scrollbar-thumb-neutral-300">
                <div className="sm:hidden">
                  <ProductVariantsValues
                    variants={variants}
                    changeCombination={changeCombination}
                    selectedCombination={selectedCombination}
                    setSelectedVariantPicture={setSelectedVariantPicture}
                  />
                </div>

                <Seperator />

                <ProductQuantity
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </div>
            </div>
          </Drawer>
        </div>
      )}
    </>
  );
};
