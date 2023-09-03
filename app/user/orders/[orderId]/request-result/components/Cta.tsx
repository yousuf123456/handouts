"use client";
import { CtaLink } from "@/app/(site)/components/CtaLink";
import { Button } from "@/app/components/Button";
import { useMediaQuery } from "@mui/material";
import React from "react";

interface CtaProps {
  type: "Cancellation" | "Return";
  requestId: string;
}

export const Cta: React.FC<CtaProps> = ({ type, requestId }) => {
  const cancellationHref = `/user/cancellations/${requestId}`;
  const returnHref = `/user/returns/${requestId}`;

  const isSmallDevices = useMediaQuery("(max-width:640px)");
  return (
    <div className="flex w-full justify-center">
      <CtaLink href={type === "Cancellation" ? cancellationHref : returnHref}>
        <Button size={isSmallDevices ? "md" : "lg"}>See More Details</Button>
      </CtaLink>
    </div>
  );
};
