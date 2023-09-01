"use client";

import { useAppSelector } from "@/app/store/store";
import { cn } from "@/app/utils/cn";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface ProgressIndicator {
  label: string;
  isLast: boolean;
  isDone: boolean;
  approved?: boolean;
  rejected?: boolean;
  currentStatus?: String;
  isOrderRequest?: boolean;
  currentlyBeingDone: boolean;
  orderRequestType?: "Cancellation" | "Return";
  statusesAfterApprovedOrRejectedStatus?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicator> = ({
  label,
  isDone,
  isLast,
  rejected,
  approved,
  isOrderRequest,
  orderRequestType,
  currentlyBeingDone,
  statusesAfterApprovedOrRejectedStatus,
}) => {
  const sideBarIsOpen = useAppSelector((state) => state.profileSidebar.open);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const animationDuration = 700;
    const intervalDuration = 1400;

    const interval = setInterval(() => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, animationDuration);
    }, intervalDuration);

    return () => clearInterval(interval);
  }, []);

  const isRejectedOrApprovedStatus = label === "Approved / Rejected";
  return (
    <div className="flex items-center gap-0">
      <div
        className={twMerge(
          clsx(
            "relative flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 sm:h-5 sm:w-5",
            isDone &&
              (rejected &&
              (isRejectedOrApprovedStatus ||
                statusesAfterApprovedOrRejectedStatus)
                ? "bg-red-500"
                : "bg-blue-500"),
            rejected &&
              statusesAfterApprovedOrRejectedStatus &&
              "bg-opacity-50",
          ),
        )}
      >
        {isDone &&
          (rejected &&
          (isRejectedOrApprovedStatus ||
            statusesAfterApprovedOrRejectedStatus) ? (
            <FaTimes className={clsx("h-4 w-4 text-white sm:h-5 sm:w-5")} />
          ) : (
            <FaCheckCircle
              className={clsx("h-4 w-4 text-white sm:h-5 sm:w-5")}
            />
          ))}

        {currentlyBeingDone && !rejected && (
          <div
            className={clsx(
              "rounded-full bg-blue-500 transition-all duration-1000",
              isVisible
                ? "h-4 w-4 opacity-100 sm:h-5 sm:w-5"
                : "h-0 w-0 opacity-100",
            )}
          />
        )}

        <p
          className={cn(
            "absolute top-6 flex w-20 justify-center break-words font-text text-xs text-black transition-all max-sm:text-center sm:w-64 sm:text-sm",
            sideBarIsOpen && "text-xs",
          )}
        >
          {label === "Approved / Rejected" && isDone
            ? approved
              ? "Approved"
              : "Rejected"
            : label}
        </p>
      </div>

      {!isLast && (
        <div
          className={cn(
            "h-1 bg-blue-200",
            isDone &&
              (rejected &&
              (isRejectedOrApprovedStatus ||
                statusesAfterApprovedOrRejectedStatus)
                ? "bg-red-500"
                : "bg-blue-500"),
            rejected &&
              (isRejectedOrApprovedStatus ||
                statusesAfterApprovedOrRejectedStatus) &&
              "bg-opacity-50",
            isOrderRequest && orderRequestType === "Cancellation"
              ? "w-36 min-[500px]:w-64 sm:w-80"
              : "w-16 min-[450px]:w-24 min-[520px]:w-28 md:w-32 lg:w-40",
            sideBarIsOpen && "w-24 lg:w-40",
          )}
        />
      )}
    </div>
  );
};
