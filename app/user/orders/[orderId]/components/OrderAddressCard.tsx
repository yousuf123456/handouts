import { AddressCard } from "@/app/components/AddressCard";
import { AddressType } from "@/app/types";
import React from "react";

interface OrderAddressCardProps {
  address: AddressType;
  heading: string;
}

export const OrderAddressCard: React.FC<OrderAddressCardProps> = ({
  address,
  heading,
}) => {
  return (
    <div className="flex flex-col items-center gap-1 max-sm:w-full">
      <h3 className="font-text text-sm font-semibold text-black">{heading}</h3>
      <AddressCard
        address={address}
        dynamicWidth
        dynamicHeight
        hideDefault
        nonEditable
      />
    </div>
  );
};
