import { Quantity } from "@/app/components/Quantity";
import React from "react";

interface ProductQuantityProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const ProductQuantity: React.FC<ProductQuantityProps> = ({
  quantity,
  setQuantity,
}) => {
  return (
    <div className="mt-0 flex gap-2">
      <h3 className="min-w-[80px] font-text text-xs sm:text-sm">Quantity :</h3>
      <Quantity quantity={quantity} setQuantity={setQuantity} />
    </div>
  );
};
