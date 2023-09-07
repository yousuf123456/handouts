"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "../utils/cn";
import { Drawer } from "./Drawer";
import { ShareLinks } from "./ShareLinks";
import { ShoppingCart } from "lucide-react";
import { HiChevronLeft } from "react-icons/hi";
import { ReduxProvider } from "../context/ReduxProvider";
import { HiEllipsisVertical, HiShare } from "react-icons/hi2";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Cart } from "../(site)/components/header/components/Cart";
import { SearchBar } from "../(site)/components/header/components/SearchBar";
import { ProfileDropDownMenu } from "../(site)/components/header/components/ProfileDropDownMenu";
import { getURL } from "next/dist/shared/lib/utils";

interface NavigationPanelProps {
  heading?: string;
  showCart?: boolean;
  showShare?: boolean;
  showSearchBar?: boolean;
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({
  heading,
  showCart,
  showShare,
  showSearchBar,
}) => {
  const [shareOpen, setShareOpen] = useState(false);
  const [url, setUrl] = useState("");

  const router = useRouter();
  const onBack = () => router.back();

  const pathname = usePathname();
  const isProductDetailsPage = pathname.includes("/products");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <>
      {!isProductDetailsPage && (
        <div
          className={cn(
            "fixed inset-0 z-[50] h-[52px] w-full scale-x-[2] overflow-hidden rounded-curved bg-themeBlue sm:hidden",
            showSearchBar ? "h-[60px] scale-x-[2.5]" : "h-[52px]",
          )}
        />
      )}

      <div
        className={cn(
          "fixed left-0 right-0 top-0 z-50 bg-transparent px-2 py-3 sm:hidden",
          isProductDetailsPage && "bg-themeBlue",
        )}
      >
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <HiChevronLeft onClick={onBack} className="h-6 w-6 text-white" />
            {heading && <p className="font-medium text-white">{heading}</p>}
          </div>

          {showSearchBar && <SearchBar doWhiteBg={true} />}

          <div className="flex items-center gap-2">
            {showShare && (
              <HiShare
                onClick={() => setShareOpen((prev) => !prev)}
                className="h-4 w-4 text-white"
              />
            )}

            {showCart && (
              <ReduxProvider>
                <Cart
                  Icon={ShoppingCart}
                  className="h-[18px] w-[18px] text-white"
                  numberCs="w-[14px] h-[14px] bg-white text-themeBlue"
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

      <Drawer
        className="pt-3"
        side="bottom"
        open={shareOpen}
        setOpen={setShareOpen}
      >
        <SheetHeader>
          <SheetTitle>Share Product</SheetTitle>
        </SheetHeader>

        <div className="my-6 grid grid-cols-4 place-items-center gap-y-6 min-[420px]:grid-cols-5 sm:grid-cols-7">
          <ShareLinks
            url={url}
            quote="But this amazing product from Handouts"
          />
        </div>
      </Drawer>
    </>
  );
};
