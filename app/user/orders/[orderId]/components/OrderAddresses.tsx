import { AddressCard } from "@/app/components/AddressCard";
import { AddressType } from "@/app/types";
import { truncateSync } from "fs";
import React from "react";
import { OrderAddressCard } from "./OrderAddressCard";

interface OrderAddressesProps {
  shippingAddress: AddressType;
  billingAddress: AddressType;
}

export const OrderAddresses: React.FC<OrderAddressesProps> = ({
  billingAddress,
  shippingAddress,
}) => {
  return (
    <div className="flex items-start gap-6 max-lg:w-full max-lg:justify-between max-sm:flex-col lg:flex-col">
      <OrderAddressCard address={shippingAddress} heading="Shipping Address" />

      <OrderAddressCard address={billingAddress} heading="Billing Address" />
    </div>
  );
};
