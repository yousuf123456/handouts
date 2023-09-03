"use client";

import React, { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";

import { Heading } from "./Heading";
import { Point } from "./Point";
import { useAppDispatch } from "@/app/store/store";
import { setIsAgreedToPolicies } from "@/app/store/features/orderRequestsSlice";
import { useSearchParams } from "next/navigation";
import { useMediaQuery } from "@mui/material";

export const Policies = () => {
  const requestType = useSearchParams().get("type") as
    | "Cancellation"
    | "Return";

  const cancellationPolicyPoints = [
    "Befor cancelling your order read the cancellation policies attentively",
    "Orders can be canceled within 24 hours of placement without incurring any cancellation fees.",
    "After 24 hours, a cancellation request will be subject to a 10% restocking fee.",
    "Customized or personalized orders are not eligible for cancellation once production has begun.",
    "Customers must contact support to initiate the cancellation process and receive a confirmation email.",
    "Refunds for canceled orders will be processed within 5 business days using the original payment method.",
  ];

  const returnPolicyPoints = [
    "Returns accepted within 30 days of purchase.",
    "Items must be in original, unused condition with all tags and packaging intact.",
    "Refunds issued through original payment method or store credit",
    "Certain items, such as perishables or personalized products, may not be eligible for return.",
    "Customers may be responsible for return shipping costs unless the return is due to a seller error or defective product.",
  ];

  const dispatch = useAppDispatch();
  const onCheckboxClicked = (e: any) => {
    if (e.target.checked) dispatch(setIsAgreedToPolicies(true));
    else dispatch(setIsAgreedToPolicies(false));
  };

  const isSmallDevices = useMediaQuery("(max-width:640px)");

  useEffect(() => {
    if (isSmallDevices) dispatch(setIsAgreedToPolicies(true));
  }, [isSmallDevices]);

  return (
    <>
      {!isSmallDevices && (
        <div className="flex flex-col gap-3">
          <Heading>
            {requestType === "Cancellation"
              ? "Cancellation Policy"
              : "Return Policy"}
          </Heading>

          <div className="flex flex-col gap-3 bg-slate-100 p-4">
            <div className="flex flex-col gap-1 bg-white p-3">
              {requestType === "Cancellation"
                ? cancellationPolicyPoints.map((point, i) => (
                    <Point
                      key={i}
                      point={point}
                      number={i}
                      showNumbering={i !== 0}
                    />
                  ))
                : returnPolicyPoints.map((point, i) => (
                    <Point
                      key={i}
                      point={point}
                      number={i}
                      showNumbering={i !== 0}
                    />
                  ))}
            </div>

            <div className="flex items-center gap-4">
              <Checkbox size="small" onClick={(e) => onCheckboxClicked(e)} />

              <p className="font-text text-sm font-semibold text-black">
                {"I have read and agreed to the " +
                  (requestType === "Cancellation" ? "cancellation" : "return") +
                  " policy of Handouts"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
