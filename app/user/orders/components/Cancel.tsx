"use client";
import React from "react";

import { CtaLink } from "@/app/(site)/components/CtaLink";
import { Button } from "@/app/components/Button";
import { StatusType } from "@/app/types";
import { useParams } from "next/navigation";

interface CancelProps {
  show: boolean | undefined;
  status?: StatusType;
}

export const Cancel: React.FC<CancelProps> = ({ show, status }) => {
  const params = useParams();

  return (
    <>
      {show && (
        <div className="w-fit">
          <CtaLink
            href={`/user/orders/${params.orderId}/request?type=Cancellation`}
          >
            <p className="text-sm font-medium text-red-500">Cancel</p>
          </CtaLink>
        </div>
      )}
    </>
  );
};
