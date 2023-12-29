import React from "react";

interface ProductSpecProps {
  Key: string;
  value: any;
}

export const ProductSpec: React.FC<ProductSpecProps> = ({ Key, value }) => {
  return (
    <div className="flex items-center gap-2">
      <p className="font-roboto text-[13px] capitalize leading-5 text-slate-600 sm:text-sm">
        {Key + " : "}
      </p>

      <p className="font-roboto text-[13px] leading-5 text-black sm:text-sm">
        {Array.isArray(value) ? value.join(",  ") : value}
      </p>
    </div>
  );
};
