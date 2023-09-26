"use client";

import React from "react";

import { CtaLink } from "../../CtaLink";
import { SignCta } from "./SignCta";
import { usePathname } from "next/navigation";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import { Categories } from "./Categories";

export const DesktopCTANavbar = () => {
  const links = [
    {
      name: "Hot Deals",
      href: "",
    },
    {
      name: "Orders",
      href: "/user/orders",
    },
    {
      name: "Returns",
      href: "/user/returns",
    },
    {
      name: "Customer Care",
      href: "",
    },
  ];

  const pathname = usePathname();
  const isSignPage = pathname === "/user/sign";
  const isSellerSignPage = pathname === "/seller/sign";

  return (
    <>
      {!isSellerSignPage && (
        <div className="flex h-10 items-center justify-between bg-themeBlue bg-opacity-80 px-8 shadow-lg sm:px-12 md:px-16 lg:h-12 lg:px-24">
          <div className="flex h-full items-center gap-4 sm:gap-8 lg:gap-12">
            <Categories />

            {!isSignPage && (
              <div className="hidden items-center gap-4 min-[920px]:flex">
                {links.map((link) => (
                  <CtaLink key={link.name} href={link.href}>
                    <p className="whitespace-nowrap font-text text-sm font-medium text-white underline">
                      {link.name}
                    </p>
                  </CtaLink>
                ))}
              </div>
            )}
          </div>

          {!isSignPage && (
            <div className="flex sm:block">
              <ReduxProvider>
                <SignCta />
              </ReduxProvider>
            </div>
          )}
        </div>
      )}
    </>
  );
};
