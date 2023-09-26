"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Heading } from "../Heading";
import { CtaLink } from "../CtaLink";
import { useFooterLinks } from "@/app/hooks/useFooterLinks";

import { RiCopyrightLine } from "react-icons/ri";
import clsx from "clsx";
import { getRoutes } from "@/app/utils/getRoutes";

export const Footer = () => {
  const pathname = usePathname();
  const { sellerAccountVerification } = getRoutes();

  const isSellerPages = pathname.includes(sellerAccountVerification);

  const footerLinks = useFooterLinks();

  return (
    <>
      {!isSellerPages && (
        <div className="hidden md:block">
          <div className="relative bottom-14 w-full bg-themeSecondary p-8 sm:bottom-0 sm:p-12 md:p-16">
            <div className="flex gap-16">
              {footerLinks.map((footerLink, index) => (
                <div key={index} className="flex flex-col gap-1 sm:gap-2">
                  <Heading className="text-lg tracking-wider text-white md:text-xl">
                    {footerLink.segment}
                  </Heading>
                  <div className="flex flex-col gap-0.5">
                    {footerLink.links.map((link, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-start gap-0.5 sm:gap-0"
                      >
                        <CtaLink href={link.href}>
                          <p className="font-text text-xs text-white underline sm:text-sm">
                            {link.name}
                          </p>
                        </CtaLink>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-2 left-8 flex items-center gap-4 sm:bottom-4 sm:left-12 md:bottom-6 md:left-16">
              <RiCopyrightLine className="h-6 w-6 text-white" />
              <p className="font-text text-xs font-medium text-white sm:text-sm">
                Handouts | 2024
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
