"use client";
import React from "react";

import { CtaLink } from "@/app/(site)/components/CtaLink";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { signOut } from "next-auth/react";

import { cn } from "@/app/utils/cn";

interface SidebarItemProps {
  isOpen: boolean;
  Icon: IconType;
  label: string;
  href: string;
  isLogout?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  Icon,
  label,
  isOpen,
  href,
  isLogout,
}) => {
  const pathname = usePathname();
  const isSelected = href.includes(pathname);

  const conditionalClassName =
    !isLogout && isSelected
      ? "text-themeSecondary opacity-100"
      : "text-themeSecondary opacity-70";
  const secondConditionalClassName =
    isLogout &&
    "opacity-100 text-rose-600 group-hover:text-red-400 group-hover:opacity-100";

  const labelCs = isOpen ? "max-lg:scale-1" : "max-lg:scale-0";

  const onLogOut = () => signOut();

  return (
    <>
      {!isLogout ? (
        <CtaLink href={href}>
          <div
            className={cn(
              "group relative flex w-full cursor-pointer items-center gap-6 rounded-md px-2 py-[6px] transition-all hover:bg-gray-100",
              isSelected && "bg-gray-100",
            )}
          >
            <Icon
              className={cn(
                "h-6 w-6 flex-shrink-0 group-hover:opacity-100 lg:h-7 lg:w-7",
                secondConditionalClassName,
                conditionalClassName,
              )}
            />

            <h2
              className={cn(
                "line-clamp-1 font-text text-[15px] font-semibold transition-all duration-300 group-hover:opacity-100 max-lg:leading-4 lg:text-base",
                labelCs,
                conditionalClassName,
                secondConditionalClassName,
              )}
            >
              {label}
            </h2>
          </div>
        </CtaLink>
      ) : (
        <div
          className={
            "group flex cursor-pointer items-center gap-6 px-2 py-[6px]"
          }
          onClick={onLogOut}
        >
          <Icon
            className={cn(
              "h-7 w-7 flex-shrink-0 text-red-600 opacity-100 group-hover:text-red-400",
              // secondConditionalClassName,
              // conditionalClassName,
            )}
          />

          <h2
            className={cn(
              "font-text text-base font-semibold transition-all duration-300 group-hover:opacity-100",
              labelCs,
              conditionalClassName,
              secondConditionalClassName,
            )}
          >
            {label}
          </h2>
        </div>
      )}
    </>
  );
};
