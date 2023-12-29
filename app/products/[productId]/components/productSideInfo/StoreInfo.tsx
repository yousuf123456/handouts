import React from "react";

import { CtaLink } from "@/app/(site)/components/CtaLink";
import { Avatar } from "@/app/components/Avatar";
import { format } from "date-fns";
import { PortionWrapper } from "./PortionWrapper";
import { Section } from "../containers/Section";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/app/components/Button";
import Link from "next/link";
import { Store } from "lucide-react";

interface StoreInfoProps {
  store: {
    ratingsCount: number;
    logo: string | null;
    name: string | null;
    posRatings: number;
    neuRatings: number;
    negRatings: number;
    createdAt: Date;
    id: string;
  };
}

export const StoreInfo: React.FC<StoreInfoProps> = ({ store }) => {
  const avgStorePosRatings = store.posRatings
    ? Math.round((store.posRatings! / store.ratingsCount!) * 100)
    : 0;

  return (
    <div className="w-full">
      <PortionWrapper portionName="Sold By" className="hidden lg:block">
        <div className="flex w-full flex-col items-center rounded-md border-[1px] p-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full">
            <Avatar image={store?.logo} />
          </div>

          <CtaLink href="">
            <h2 className="font-text font-semibold text-themeSecondary hover:opacity-70">
              {store?.name}
            </h2>
          </CtaLink>

          <div className="mt-4 flex w-full flex-col items-start gap-2">
            <div className="flex w-full flex-col gap-0">
              <p className="font-roboto text-sm text-black">
                {avgStorePosRatings + "% Positive Reviews"}
              </p>
            </div>

            <div className="flex w-full flex-col gap-0">
              <p className="font-roboto text-xs font-medium text-slate-600">
                Joined On:
              </p>
              <p className="font-roboto text-sm font-medium text-black">
                {format(store?.createdAt!, "do / MMMM / Y")}
              </p>
            </div>
          </div>

          <CtaLink href={`/stores/${store.id}`}>
            <p className="mt-4 font-roboto text-sm font-semibold text-themeBlue underline hover:opacity-70">
              Visit Store
            </p>
          </CtaLink>
        </div>
      </PortionWrapper>

      <div id="storeInfo" className="w-full lg:hidden">
        <Section mode="padding">
          <div className="flex max-md:flex-col max-md:gap-3 max-sm:gap-2 md:justify-between">
            <div className="flex gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-sm md:h-16 md:w-16">
                <Image
                  src={store.logo || ""}
                  fill
                  className=" object-cover"
                  alt="Store Logo"
                />
              </div>

              <div className="mt-1 flex gap-1 max-md:w-full max-md:justify-between md:flex-col">
                <h4 className="line-clamp-1 text-sm text-black">
                  {store.name}
                </h4>

                <Link href="/store" className="hidden sm:block">
                  <div className="flex items-center justify-center gap-2 rounded-md border-[1px] border-themeBlue px-4 py-1">
                    <Store className="h-4 w-4 text-themeBlue" />
                    <p className="text-xs text-themeBlue">Visit Store</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="flex max-md:w-full max-md:justify-around md:gap-16">
              <div className="flex flex-col items-center">
                <h3 className="font-roboto text-sm font-medium text-black sm:text-base">
                  {avgStorePosRatings + " % "}
                </h3>
                <p className="text-xs text-slate-500 md:text-sm">
                  Positive Reviews
                </p>
              </div>

              <div>
                <Separator orientation="vertical" />
              </div>

              <div className="flex flex-col items-center">
                <h3 className="font-roboto text-sm font-medium text-black sm:text-base">
                  {format(store?.createdAt!, "do / MMMM / Y")}
                </h3>
                <p className="text-xs text-slate-500 md:text-sm">Joined On</p>
              </div>
            </div>

            <Link href="/store" className="sm:hidden">
              <div className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border-[1px] border-themeBlue py-1">
                <Store className="h-3 w-3 text-themeBlue" />
                <p className="text-xs text-themeBlue">Visit Store</p>
              </div>
            </Link>
          </div>
        </Section>
      </div>
    </div>
  );
};
