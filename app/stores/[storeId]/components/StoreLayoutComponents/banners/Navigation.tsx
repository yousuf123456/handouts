import { CtaLink } from "@/app/(site)/components/CtaLink";
import clsx from "clsx";
import React from "react";

interface NavigationProps {
  currentSection: "homepage" | "products" | "profile";
  storeId: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  storeId,
}) => {
  const toggleBarItemCs =
    "lg:px-3 px-2 py-1 text-xs min-[440px]:text-sm text-center lg:text-base font-text font-medium transition-all bg-white cursor-pointer";

  return (
    <div className="flex h-fit justify-start">
      <div className="w-fit rounded-sm bg-slate-100 p-2">
        <div className="flex gap-10 sm:gap-16">
          <CtaLink href={`/stores/${storeId}`}>
            <h3
              className={clsx(
                toggleBarItemCs,
                currentSection === "homepage"
                  ? "rounded-sm bg-opacity-100 text-themeBlue"
                  : "bg-opacity-0 text-slate-500",
              )}
            >
              Home Page
            </h3>
          </CtaLink>

          <CtaLink href={`/stores/${storeId}/products`}>
            <h3
              className={clsx(
                toggleBarItemCs,
                currentSection === "products"
                  ? "bg-opacity-100 text-themeBlue"
                  : "bg-opacity-0 text-slate-500",
              )}
            >
              All Products
            </h3>
          </CtaLink>

          <CtaLink href={`/stores/${storeId}/profile`}>
            <h3
              className={clsx(
                toggleBarItemCs,
                currentSection === "profile"
                  ? "bg-opacity-100 text-themeBlue"
                  : "bg-opacity-0 text-slate-500",
              )}
            >
              Profile
            </h3>
          </CtaLink>
        </div>
      </div>
    </div>
  );
};
