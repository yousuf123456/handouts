import React from "react";
import { differenceInMonths, differenceInYears, format } from "date-fns";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface JoinedOnProps {
  createdAt: Date;
}

export const JoinedOn: React.FC<JoinedOnProps> = ({ createdAt }) => {
  const joinedOn = createdAt;
  const currentDate = new Date();

  // Calculate the difference in years and months
  const diffInYears = differenceInYears(currentDate, joinedOn);
  const diffInMonths = differenceInMonths(currentDate, joinedOn);

  let durationText;

  if (diffInYears > 0) {
    if (diffInMonths % 12 === 0) {
      durationText = `${diffInYears} ${diffInYears === 1 ? "year" : "years"}`;
    } else {
      durationText = `${diffInYears} ${
        diffInYears === 1 ? "year" : "years"
      } and ${diffInMonths % 12} ${
        diffInMonths % 12 === 1 ? "month" : "months"
      }`;
    }
  } else {
    durationText = `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"}`;
  }
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col gap-7">
          <div className="flex w-full items-center justify-between">
            <p className="font-roboto text-sm font-medium text-black lg:text-base">
              Joined On
            </p>

            <Calendar className="h-4 w-4 text-slate-600 lg:h-5 lg:w-5" />
          </div>

          <div className="flex flex-col gap-2">
            <CardTitle className="text-xl xl:text-2xl">
              {format(createdAt, "d MMM yyyy")}
            </CardTitle>

            <CardDescription className="text-[13px] leading-4 lg:text-sm">
              Has been with Handouts for more than {durationText}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
