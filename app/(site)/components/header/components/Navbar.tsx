import React from "react";
import Image from "next/image";

import { SearchBar } from "./SearchBar";
import { Cart } from "./Cart";
import { Button } from "@/app/components/Button";
import { Favourites } from "./Favourites";
import { SignCta } from "./SignCta";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { CtaLink } from "../../CtaLink";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex flex-col">
      <div className="flex h-[48px] w-full items-center justify-between bg-white px-4 pb-0 min-[420px]:gap-3 sm:h-[68px] sm:px-8 md:h-20 md:py-4 lg:gap-6 lg:px-12">
        <CtaLink href="/">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="relative h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10">
              <Image src="/logos/HandoutsLOGO.png" alt="Logo" fill />
            </div>

            <div className="flex flex-col gap-[2px]">
              <p className="mb-0 pb-0 font-heading text-sm font-extrabold leading-none tracking-wider text-themeBlue sm:text-base lg:tracking-widest">
                Handouts
              </p>

              <p className="hidden font-text text-[10px] font-bold leading-none tracking-wide text-themeSecondary lg:block">
                Lets decor, born and bred
              </p>
            </div>
          </div>
        </CtaLink>

        <div className="ml-4 hidden flex-grow sm:block">
          <SearchBar />
        </div>

        <div className="ml-2 flex items-center gap-3 max-sm:mr-4 max-sm:flex max-sm:flex-grow max-sm:justify-end sm:mx-4 sm:justify-between md:gap-4">
          <div className="hidden min-[920px]:block">
            <Favourites />
          </div>

          <div>
            <ReduxProvider>
              <Cart Icon={RiShoppingCart2Fill} />
            </ReduxProvider>
          </div>
        </div>

        <div className="hidden md:block">
          <Link href="sell-on-handouts/landing">
            <Button
              variant="outline"
              size="sm"
              className="border-themeSecondary font-semibold text-themeSecondary hover:bg-themeSecondary "
            >
              Sell on Handouts
            </Button>
          </Link>
        </div>

        <div className="sm:hidden">
          <ReduxProvider>
            <SignCta />
          </ReduxProvider>
        </div>
      </div>

      {/* For the small width devices */}
      <div className="block w-full px-4 pb-2 sm:hidden sm:px-8 lg:px-12">
        <SearchBar />
      </div>
    </div>
  );
};
