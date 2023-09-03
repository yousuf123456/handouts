import { CombinationsType, VariantsType } from "@/app/types";
import clsx from "clsx";
import React from "react";

import Image from "next/image";
import { TooltipWrapper } from "@/app/components/TooltipWrapper";
import { ProductImage } from "@/app/components/ProductImage";

interface ProductVariantsProps {
  variants: VariantsType | undefined;
  selectedCombination: CombinationsType | undefined;
  changeCombination: (variant: string, value: string) => void;
  setSelectedVariantPicture: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ProductVariants: React.FC<ProductVariantsProps> = ({
  variants,
  selectedCombination,
  changeCombination,
  setSelectedVariantPicture,
}) => {
  return (
    <>
      {variants && (
        <div className="mt-6 flex flex-col gap-3">
          {Object.keys(variants).map((key1, i) => (
            <div key={i} className="flex items-center gap-2">
              <h3 className="min-w-[80px] font-text text-sm">
                {variants[key1].title + " :"}
              </h3>
              <div className="flex items-end gap-2">
                {Object.keys(variants[key1]).map((key2, i2) => {
                  if (key2 === "title") {
                    return null;
                  }

                  const isSelectedVariant =
                    selectedCombination?.combination[key1] ===
                    variants[key1][key2].title;
                  return (
                    <div key={i2} className="flex flex-col gap-1">
                      {variants[key1][key2].images.length === 0 ? (
                        <p
                          className={clsx(
                            "cursor-pointer px-1 font-text font-semibold uppercase tracking-wider text-slate-700 transition-all hover:bg-themeBlue hover:text-white",
                            isSelectedVariant && "bg-themeBlue text-white",
                          )}
                          onClick={() =>
                            changeCombination(key1, variants[key1][key2].title)
                          }
                        >
                          {variants[key1][key2].title}
                        </p>
                      ) : (
                        <>
                          {i2 === 1 && (
                            <p
                              className={clsx(
                                "font-text text-sm font-semibold uppercase text-slate-700",
                              )}
                            >
                              {selectedCombination?.combination.color}
                            </p>
                          )}

                          {
                            <TooltipWrapper
                              arrow={false}
                              content={variants[key1][key2].title}
                            >
                              <div
                                className={clsx(
                                  "peer relative h-9 w-9 cursor-pointer",
                                  isSelectedVariant &&
                                    "border-2 border-blue-500",
                                )}
                                onClick={() => {
                                  changeCombination(
                                    key1,
                                    variants[key1][key2].title,
                                  );
                                  setSelectedVariantPicture(
                                    variants[key1][key2].images,
                                  );
                                }}
                              >
                                <ProductImage
                                  src={variants[key1][key2].images[0]}
                                />
                              </div>
                            </TooltipWrapper>
                          }
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
