"use client";

import { usePathname } from "next/navigation";
import path from "path";
import React from "react";
import { cn } from "../utils/cn";
import { getRoutes } from "../utils/getRoutes";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const { sellerAccountVerification, shipping, payment, cart } = getRoutes();

  const noPT =
    pathname === shipping || pathname === cart || pathname === payment;

  const isSellerSignPage = pathname === "/seller/sign";

  const isSellerPages = pathname.includes(sellerAccountVerification);

  return (
    <div
      id="parent"
      className={cn(
        "pt-10 sm:pt-[108px] md:pt-[120px] lg:pt-32",
        noPT && "pt-0",
        isSellerSignPage && "sm:pt-[68px] md:pt-[80px] lg:pt-[88px]",
        isSellerPages && "pt-0 sm:pt-0 md:pt-0 lg:pt-0",
      )}
    >
      {children}
    </div>
  );
};
