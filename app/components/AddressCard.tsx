"use client";
import React from "react";
import { AddressType } from "../types";

import { FormatAddress } from "./FormatAddress";

import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { cn } from "../utils/cn";
import Link from "next/link";
import { useBreakpoint } from "../hooks/useBreakpoints";

interface AddressCardProps {
  address: AddressType;
  isSelected?: boolean;
  nonEditable?: boolean;
  hideDefault?: boolean;
  dynamicWidth?: boolean;
  dynamicHeight?: boolean;
  withoutBorder?: boolean;
  onEdit?: (address: AddressType) => void;
  onClick?: (address: AddressType) => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  onEdit,
  onClick,
  address,
  isSelected,
  hideDefault,
  dynamicWidth,
  withoutBorder,
  dynamicHeight,
  nonEditable,
}) => {
  const handleEdit = (address: AddressType) => {
    onEdit && onEdit(address);
  };

  const handleSelect = (address: AddressType) => {
    onClick && onClick(address);
  };

  const width = useBreakpoint();

  return (
    <div
      className={clsx(
        "flex cursor-pointer flex-col gap-2 px-4 py-2 transition-all",
        dynamicWidth ? "w-full max-w-[444px]" : "w-[444px]",
        dynamicHeight ? "h-full" : "min-h-[144px]",
        withoutBorder
          ? "bg-slate-100 py-4"
          : "rounded-sm bg-white shadow-cardShadow",
        isSelected && "shadow-themeBlue",
      )}
      onClick={() => handleSelect(address)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 md:hidden">
              <p
                className={cn(
                  "line-clamp-1 font-text text-xs font-semibold text-slate-900",
                  isSelected && "text-themeBlue",
                )}
              >
                {address.fullName}
              </p>
              <Badge
                variant="outline"
                className={cn(isSelected && " border-themeBlue text-themeBlue")}
              >
                {address.type}
              </Badge>
            </div>

            <h3
              className={cn(
                "hidden font-text text-base font-semibold text-slate-800 md:block",
                isSelected && "text-themeBlue",
              )}
            >
              {address.type}
            </h3>
          </div>

          {!nonEditable &&
            (width > 640 ? (
              <p
                className="font-text text-sm font-semibold text-themeBlue transition-all hover:text-blue-300"
                onClick={() => handleEdit(address)}
              >
                Edit
              </p>
            ) : (
              <Link href={`/user/addAddress?update=true&id=${address._id}`}>
                <p
                  className="font-text text-sm font-semibold text-themeBlue transition-all hover:text-blue-300"
                  onClick={() => handleEdit(address)}
                >
                  Edit
                </p>
              </Link>
            ))}
        </div>

        <div className="flex flex-col gap-0">
          <p className="hidden font-text text-xs font-semibold text-slate-900 md:block">
            {address.fullName}
          </p>

          <p className="text-start font-text text-xs font-semibold text-slate-900">
            {address.phone}
          </p>
        </div>
      </div>

      <div>
        <FormatAddress
          rawAddress={address}
          className="text-start font-text text-xs text-black md:text-sm"
        />
      </div>

      {!hideDefault && (
        <div className="flex h-full items-end gap-2">
          {address.isDefaultShippingAddress && (
            <Badge className="line-clamp-1 rounded-sm">
              <p className=" line-clamp-1">Default Shipping Address</p>
            </Badge>
          )}

          {address.isDefaultBillingAddress && (
            <Badge className=" rounded-sm">
              <p className=" line-clamp-1">Default Billing Address</p>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
