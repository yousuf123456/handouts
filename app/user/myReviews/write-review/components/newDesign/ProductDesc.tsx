import { ProductImage } from "@/app/components/ProductImage";
import React from "react";

interface ProductDescProps {
  product: {
    id: string;
    name: string;
    storeId: string;
    storeName: string;
    image: string | null;
  };
}

export const ProductDesc: React.FC<ProductDescProps> = ({ product }) => {
  return (
    <div className="flex w-full justify-center bg-slate-100 p-2">
      <div className="flex w-[75%] items-center justify-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-sm">
          <ProductImage src={product.image} />
        </div>

        <p className="font-text text-base text-black">{product.name}</p>
      </div>
    </div>
  );
};
