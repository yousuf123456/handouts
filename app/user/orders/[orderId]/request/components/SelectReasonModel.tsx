"use client";

import { Button } from "@/app/components/Button";
import { reasons } from "@/app/constants/selectOptions";
import { cn } from "@/app/utils/cn";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { HiChevronDown, HiPlus } from "react-icons/hi";

const Drawer = dynamic(() => import("@/app/components/Drawer"));

interface SelectReasonModelProps {
  className?: string;
  reason: string | undefined;
  onSelect: (value: string) => void;
  requestType: "Cancellation" | "Return";
}

export const SelectReasonModel: React.FC<SelectReasonModelProps> = ({
  reason,
  onSelect,
  className,
  requestType,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const onConfirm = () => {
    toggleOpen();
    onSelect(selectedReason || "");
  };

  return (
    <>
      <div className={cn("mt-4 sm:px-8 md:px-24 lg:hidden", className)}>
        <div
          onClick={toggleOpen}
          className={cn(
            "flex w-full cursor-pointer items-center justify-between rounded-md border-[2px] border-dashed border-blue-200 px-3 py-2 transition-all hover:border-blue-400",
          )}
        >
          <div className="flex items-center gap-2">
            <HiPlus className="h-3 w-3 text-black sm:h-4 sm:w-4" />
            <p className="text-xs font-medium text-black sm:text-sm">
              {reason ||
                (requestType === "Cancellation"
                  ? "Cancellation Reason"
                  : "Return Reason")}
            </p>
          </div>

          <HiChevronDown className="h-4 w-4 text-slate-600 transition-all sm:h-5 sm:w-5" />
        </div>
      </div>

      <Drawer open={open} setOpen={setOpen} side="bottom">
        <SheetHeader>
          <SheetTitle className="max-sm:text-base">
            Select {requestType === "Return" ? "Return" : "Cancellation"} Reason
          </SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 w-full pb-10 sm:px-8">
          <div className="flex w-full flex-col gap-2">
            <RadioGroup onValueChange={(value) => setSelectedReason(value)}>
              {reasons.map((Reason, i) => (
                <div key={i} className="flex items-center gap-3">
                  <RadioGroupItem value={Reason} />
                  <p className=" line-clamp-1 text-sm font-medium text-black sm:text-base">
                    {Reason}
                  </p>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="fixed bottom-0 left-0 right-0">
            <Button className="h-10 w-full" onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};
