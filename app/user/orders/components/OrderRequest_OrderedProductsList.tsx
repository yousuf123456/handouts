import { OrderedProductType, PackageType } from "@/app/types";
import React from "react";
import { OrderRequest_OrderedProductCard } from "./OrderRequest_OrderedProductCard";
import { OrderedProduct } from "@prisma/client";

interface OrderRequest_OrderedProductsListProps {
  packages?: PackageType[];
  isOrderRequest?: boolean;
  orderedProducts?: OrderedProductType[];
}

export const OrderRequest_OrderedProductsList: React.FC<
  OrderRequest_OrderedProductsListProps
> = ({ packages, orderedProducts, isOrderRequest }) => {
  return (
    <div className="mt-3 flex flex-col gap-3 sm:mt-6">
      {isOrderRequest
        ? orderedProducts?.map((orderedProduct, i) => (
            <OrderRequest_OrderedProductCard
              key={i}
              orderedProduct={orderedProduct}
            />
          ))
        : packages?.map((Package, i) => {
            const orderedProducts =
              Package.orderedProducts as unknown as OrderedProductType[];
            return orderedProducts.map((orderedProduct) => (
              <div className="pr-0 md:pr-4 lg:pr-[72px] xl:pr-24" key={i}>
                <OrderRequest_OrderedProductCard
                  orderedProduct={orderedProduct as OrderedProductType}
                />
              </div>
            ));
          })}
    </div>
  );
};
