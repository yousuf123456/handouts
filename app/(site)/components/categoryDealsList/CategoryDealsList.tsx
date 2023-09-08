import React from "react";
import { DealsList } from "./components/DealsList";
import { Button } from "@/app/components/Button";
import { Heading } from "../Heading";
import { CtaLink } from "../CtaLink";
import { getDiscountedProducts } from "@/app/actions/getDiscountedProducts";

export const CategoryDealsList = async () => {
  const category = "Furniture";
  const discountedProducts = await getDiscountedProducts(true);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className=" flex h-full items-end">
          <Heading>Deals On {category}</Heading>
        </div>

        <div className="hidden sm:block">
          <Button variant="default">Shop More</Button>
        </div>

        <div className="block sm:hidden">
          <CtaLink href="">
            <p className="font-text text-sm font-semibold text-themeBlue underline">
              Shop More
            </p>
          </CtaLink>
        </div>
      </div>

      <DealsList products={discountedProducts} />
    </div>
  );
};
