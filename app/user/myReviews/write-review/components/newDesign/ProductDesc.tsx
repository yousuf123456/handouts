import { ProductImage } from "@/app/components/ProductImage";
import React from "react";

interface ProductDescProps {
  product: {
    id: string;
    name: string;
    storeName: string;
    image: string | null;
  };
}

export const ProductDesc: React.FC<ProductDescProps> = ({ product }) => {
  return (
    <div className="flex w-full justify-center bg-slate-100 p-2">
      <div className="flex w-full items-center justify-center gap-4 min-[460px]:w-[90%] sm:w-[80%] md:w-[75%]">
        <div className="relative h-12 w-12 overflow-hidden rounded-sm sm:h-14 sm:w-14">
          <ProductImage src={product.image} />
        </div>

        <p className="font-text text-sm text-black sm:text-base">
          {product.name}
        </p>
      </div>
    </div>
  );
};
