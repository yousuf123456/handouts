import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, ShoppingBag } from "lucide-react";
import React from "react";

interface TotalSalesProps {
  totalSales: number;
}

export const TotalSales: React.FC<TotalSalesProps> = ({ totalSales }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col gap-7">
          <div className="flex w-full items-center justify-between">
            <p className="font-roboto text-sm font-medium text-black lg:text-base">
              Total Sales
            </p>

            <ShoppingBag className="h-4 w-4 text-slate-600 lg:h-5 lg:w-5" />
          </div>

          <div className="flex flex-col gap-2">
            <CardTitle className="text-xl xl:text-2xl">
              {"+" + totalSales}
            </CardTitle>

            <CardDescription className="text-[13px] leading-4 lg:text-sm">
              Has sold +{totalSales} products in Handouts
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
