"use client";

import { usePathname } from "next/navigation";
import path from "path";
import React from "react";
import { cn } from "../utils/cn";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const noPT =
    pathname === "/shipping" || pathname === "/cart" || pathname === "/payment";

  return (
    <div
      id="parent"
      className={cn(
        "pt-10 sm:pt-[108px] md:pt-[120px] lg:pt-32",
        noPT && "pt-0",
      )}
    >
      {children}
    </div>
  );
};
