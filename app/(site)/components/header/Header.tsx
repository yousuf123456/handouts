"use client";

import React, { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { DesktopCTANavbar } from "./components/DesktopCTANavbar";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils/cn";
import { getRoutes } from "@/app/utils/getRoutes";
import axios from "axios";

export const Header = () => {
  const pathname = usePathname();
  const { sellerAccountVerification } = getRoutes();

  const isSellerPages = pathname.includes(sellerAccountVerification);

  return (
    <>
      {!isSellerPages && (
        <div
          className={cn("left-0 top-0 z-[999] hidden w-full sm:fixed sm:block")}
        >
          <Navbar />
          <DesktopCTANavbar />
        </div>
      )}
    </>
  );
};
