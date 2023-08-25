"use client";

import React, { useState } from "react";
import { PaymentOptionCard } from "./PaymentOptionCard";
import { Heading } from "@/app/(site)/components/Heading";
import { paymentOptions } from "@/app/constants/options";
import { PaymentMethods } from "@/app/types";

export const PaymentOptions = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethods>();

  return (
    <div className="flex flex-col gap-6 px-4 py-8 sm:px-8 lg:px-32 xl:px-48">
      <Heading>Select a Payment Method</Heading>
      <div className="flex flex-wrap justify-between gap-6">
        {paymentOptions.map((paymentOption, i) => (
          <PaymentOptionCard
            key={i}
            label={paymentOption.label}
            image={paymentOption.image}
            isSelected={selectedPaymentMethod === paymentOption.label}
            onClick={() => setSelectedPaymentMethod(paymentOption.label)}
          />
        ))}
      </div>
    </div>
  );
};
