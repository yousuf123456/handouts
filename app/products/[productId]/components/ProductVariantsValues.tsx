import { ProductImage } from "@/app/components/ProductImage";
import { TooltipWrapper } from "@/app/components/TooltipWrapper";
import { CombinationsType, VariantsType } from "@/app/types";
import clsx from "clsx";
import React from "react";

interface ProductVariantsValuesProps {
  variants: VariantsType;
  selectedCombination: CombinationsType | undefined;
  changeCombination: (variant: string, value: string, images: string[]) => void;
  setSelectedVariantPicture: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ProductVariantsValues: React.FC<ProductVariantsValuesProps> = ({
  setSelectedVariantPicture,
  selectedCombination,
  changeCombination,
  variants,
}) => {
  return (
    <div className="flex flex-col gap-5 sm:mt-3 sm:gap-3 lg:mt-6">
      {Object.keys(variants).map((key1, i) => (
        <div
          key={i}
          className="flex gap-1 max-sm:flex-col sm:items-center sm:gap-2"
        >
          <h3 className="font-text text-xs max-sm:text-slate-500 sm:min-w-[80px] sm:text-sm">
            {variants[key1].title + " :"}
          </h3>

          <div className="flex flex-wrap items-end gap-2">
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
                        "cursor-pointer border-2 border-transparent px-4 text-sm font-medium capitalize tracking-wider text-slate-700 transition-all max-sm:rounded-2xl max-sm:bg-slate-100 max-sm:py-[1px] sm:px-1 sm:text-sm sm:hover:bg-themeBlue sm:hover:text-white lg:text-base",
                        isSelectedVariant &&
                          "text-themeBlue max-sm:border-themeBlue sm:bg-themeBlue sm:text-white",
                      )}
                      onClick={() =>
                        changeCombination(
                          key1,
                          variants[key1][key2].title,
                          variants[key1][key2].images,
                        )
                      }
                    >
                      {variants[key1][key2].title}
                    </p>
                  ) : (
                    <>
                      {i2 === 1 && (
                        <p
                          className={clsx(
                            "hidden font-text text-sm font-semibold uppercase text-slate-700 sm:block",
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
                              "peer relative h-10 w-10 cursor-pointer",
                              isSelectedVariant && "border-2 border-blue-500",
                            )}
                            onClick={() => {
                              changeCombination(
                                key1,
                                variants[key1][key2].title,
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
  );
};
