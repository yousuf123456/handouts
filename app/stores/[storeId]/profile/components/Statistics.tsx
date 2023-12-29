import React from "react";
import { JoinedOn } from "./JoinedOn";
import { TotalSales } from "./TotalSales";
import { SalesSuccessRatio } from "./SalesSuccessRatio";

interface StatisticsProps {
  createdAt: Date;
  returnPer: number;
  totalSales: number;
  successPer: number;
  cancellationPer: number;
}

export const Statistics: React.FC<StatisticsProps> = ({
  createdAt,
  returnPer,
  totalSales,
  successPer,
  cancellationPer,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full gap-4 max-[460px]:flex-col lg:gap-6 xl:w-96 xl:flex-shrink-0 xl:flex-col xl:gap-8">
        <div className="w-full">
          <JoinedOn createdAt={createdAt} />
        </div>

        <div className="w-full">
          <TotalSales totalSales={totalSales} />
        </div>

        <div className="hidden w-full md:block">
          <SalesSuccessRatio
            returnPer={returnPer}
            successPer={successPer}
            cancellationPer={cancellationPer}
          />
        </div>
      </div>

      <div className="w-full md:hidden">
        <SalesSuccessRatio
          returnPer={returnPer}
          successPer={successPer}
          cancellationPer={cancellationPer}
        />
      </div>
    </div>
  );
};
