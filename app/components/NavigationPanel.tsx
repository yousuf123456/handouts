"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisVertical } from "react-icons/hi2";
import { ShoppingCart } from "lucide-react";
import { Cart } from "../(site)/components/header/components/Cart";
import { ReduxProvider } from "../context/ReduxProvider";
import { SearchBar } from "../(site)/components/header/components/SearchBar";
import { ProfileDropDownMenu } from "../(site)/components/header/components/ProfileDropDownMenu";
import clsx from "clsx";
import { cn } from "../utils/cn";

interface NavigationPanelProps {
  heading?: string;
  showCart?: boolean;
  showSearchBar?: boolean;
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({
  heading,
  showCart,
  showSearchBar,
}) => {
  const router = useRouter();
  const onBack = () => router.back();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[50] h-[52px] w-full scale-x-[2] overflow-hidden rounded-curved bg-themeBlue sm:hidden",
          showSearchBar ? "h-[60px] scale-x-[2.5]" : "h-[52px]",
        )}
      />
      <div className="fixed left-0 right-0 top-0 z-50 bg-transparent px-2 py-3 sm:hidden">
        <div className="flex justify-between gap-3">
          <div className="flex items-center gap-2">
            <HiChevronLeft onClick={onBack} className="h-6 w-6 text-white" />
            {heading && <p className="font-medium text-white">{heading}</p>}
          </div>

          {showSearchBar && <SearchBar doWhiteBg={true} />}

          <div className="flex items-center gap-2">
            {showCart && (
              <ReduxProvider>
                <Cart
                  Icon={ShoppingCart}
                  className="h-5 w-5 text-white"
                  numberCs="w-4 h-4 bg-white text-themeBlue"
                />
              </ReduxProvider>
            )}

            <ProfileDropDownMenu includeAllLinks={true}>
              <div>
                <HiEllipsisVertical className="h-6 w-6 text-white" />
              </div>
            </ProfileDropDownMenu>
          </div>
        </div>
      </div>
    </>
  );
};
