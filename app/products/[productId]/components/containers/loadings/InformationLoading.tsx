"use client";

import React from "react";
import { Container } from "../../Container";
import { Skeleton } from "@/components/ui/skeleton";
import { Seperator } from "@/app/components/Seperator";

export const InformationLoading = () => {
  return (
    <Container>
      <div className="hidden gap-0 lg:flex">
        <div className="flex flex-col items-start gap-2">
          <Skeleton className="h-80 w-80" />

          <div className="flex w-80 items-center justify-center gap-2">
            <Skeleton className="w- h-7" />
            <div className="flex gap-3">
              <Skeleton className=" h-16 w-16" />
              <Skeleton className=" h-16 w-16" />
              <Skeleton className=" h-16 w-16" />
            </div>
            <Skeleton className="h-7 w-7" />
          </div>
        </div>

        <div className="ml-6 flex w-full flex-col gap-4 px-6">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-8 w-64" />

            <Skeleton className="h-8 w-64" />
          </div>

          <Seperator className="bg-slate-200" />

          <div className="flex gap-4">
            <Skeleton className="h-5 w-14 flex-shrink-0" />

            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 5 }, (_, index) => (
                <Skeleton key={index} className="h-8 w-20" />
              ))}
            </div>
          </div>

          <Seperator className="bg-slate-200" />

          <div className="mt-0 flex items-center gap-4">
            <Skeleton className="h-5 w-14" />

            <div className="flex gap-1">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>

          <Seperator className="bg-slate-200" />

          <div className="flex h-full items-end gap-5">
            <Skeleton className=" h-11 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
        </div>

        <div className="w-56 flex-shrink-0 border-l-[1px] border-slate-200 px-4">
          <div className="flex flex-col gap-6">
            <Skeleton className="h-36 w-full" />

            <Skeleton className="h-36 w-full" />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="mt-3 flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="hidden flex-col gap-3 sm:flex">
              {Array.from({ length: 3 }, (_, index) => (
                <Skeleton key={index} className="h-16 w-[60px]" />
              ))}
            </div>

            <Skeleton className="aspect-[16/9] h-auto w-full" />
          </div>

          <div className="flex flex-col gap-6 md:pl-[76px]">
            <Skeleton className="h-9 w-full sm:w-80 md:h-12" />

            <Skeleton className="h-9 w-full sm:w-80 md:h-12" />

            <Skeleton className="h-9 w-full sm:w-80 md:h-12" />

            <div className="flex gap-8">
              <Skeleton className="h-9 w-full md:h-12" />

              <Skeleton className="h-9 w-full md:h-12" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
