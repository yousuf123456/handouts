import { Heading } from "@/app/(site)/components/Heading";
import { SkeletonBox } from "@/app/components/SkeletonBox";

import React from "react";

interface LoadingProps {
  heading: string;
}

export const Loading: React.FC<LoadingProps> = ({ heading }) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <Heading className="hidden sm:block">{heading}</Heading>

      <div className="flex w-full flex-col gap-6">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex w-full flex-col gap-6">
            <div className="flex w-full flex-col gap-3">
              <div className="flex items-center justify-between">
                <SkeletonBox className="h-6 w-28" />
                <SkeletonBox className="h-6 w-28" />
              </div>

              <SkeletonBox className="h-28 w-full" />
            </div>

            {index !== 3 && <div className="h-[1px] w-full bg-slate-300" />}
          </div>
        ))}
      </div>
    </div>
  );
};
