import React from "react";
import { cn } from "../utils/cn";

interface ProductsListLayoutProps {
  children: React.ReactNode;
  customLayout?: string;
  className?: string;
}

export const ProductsListLayout: React.FC<ProductsListLayoutProps> = ({
  children,
  className,
  customLayout,
}) => {
  return (
    <div
      className={cn(
        customLayout ||
          "grid grid-cols-2 min-[540px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
        "gap-x-2 gap-y-2 sm:gap-x-3 sm:gap-y-3",
        className,
      )}
    >
      {children}
    </div>
  );
};
