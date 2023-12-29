"use client";

import React from "react";

import { Card, CardHeader } from "@/components/ui/card";

import { Check } from "lucide-react";
import { LinearProgress } from "@mui/material";

interface SalesSuccessRatioProps {
  returnPer: number;
  successPer: number;
  cancellationPer: number;
}

export const SalesSuccessRatio: React.FC<SalesSuccessRatioProps> = ({
  successPer,
  returnPer,
  cancellationPer,
}) => {
  const labelCs = "font-medium text-black font-roboto text-sm";
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col gap-7">
          <div className="flex w-full items-start justify-between">
            <p className="font-roboto text-sm font-medium text-black lg:text-base">
              Sales Success
            </p>

            <Check className="h-4 w-4 text-slate-600 lg:h-5 lg:w-5" />
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-0">
              <p className={labelCs}>Delievered {Math.round(successPer)}%</p>
              <LinearProgress
                variant="determinate"
                color="primary"
                value={successPer}
              />
            </div>

            <div className="flex flex-col gap-0">
              <p className={labelCs}>Returned {Math.round(returnPer)}%</p>
              <LinearProgress
                variant="determinate"
                color="secondary"
                value={returnPer}
              />
            </div>

            <div className="flex flex-col gap-0">
              <p className={labelCs}>
                Cancelled {Math.round(cancellationPer)}%
              </p>
              <LinearProgress
                variant="determinate"
                color="error"
                value={cancellationPer}
              />
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
