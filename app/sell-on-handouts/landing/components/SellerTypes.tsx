import { cn } from "@/lib/utils";
import React from "react";

export const SellerTypes = () => {
  const cardClassName = "w-80 rounded-md h-[480px] bg-black bg-opacity-10";

  return (
    <div className="flex items-center justify-around gap-12">
      <div className={cn(cardClassName)}></div>

      <div className={cn(cardClassName, "h-[560px]")}></div>

      <div className={cn(cardClassName)}></div>
    </div>
  );
};
