"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaHome, FaShopify, FaStar, FaTruck, FaUser } from "react-icons/fa";
import { getRoutes } from "@/app/utils/getRoutes";
import { HiLogout } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

import Link from "next/link";

interface ProfileDropDownMenuProps {
  children: React.ReactNode;
  includeAllLinks?: boolean;
}

export default function ProfileDropDownMenu({
  children,
  includeAllLinks,
}: ProfileDropDownMenuProps) {
  const iconCs = "mr-3 h-5 w-5";
  const {
    home,
    orders,
    profile,
    returns,
    myAccount,
    cancellations,
    historyReviews,
    toBeReviewdReviews,
  } = getRoutes();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className=" text-themeSecondary">
          My Account
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="flex flex-col gap-1">
          {includeAllLinks && (
            <Link href={home}>
              <DropdownMenuItem>
                <FaHome className={cn(iconCs, "text-themeBlue")} />
                <span>Home</span>
              </DropdownMenuItem>
            </Link>
          )}

          <Link href={profile}>
            <DropdownMenuItem className="hidden md:flex">
              <FaUser className={cn(iconCs, "text-themeBlue")} />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>

          <Link href={myAccount}>
            <DropdownMenuItem className="md:hidden">
              <FaUser className={cn(iconCs, "text-themeBlue")} />
              <span>My Account</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FaTruck className={cn(iconCs, "text-green-500")} />
              <span>My Orders</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Link href={orders}>
                  <DropdownMenuItem>
                    <span>All Orders</span>
                  </DropdownMenuItem>
                </Link>

                <Link href={cancellations}>
                  <DropdownMenuItem>
                    <span>Cancellations</span>
                  </DropdownMenuItem>
                </Link>

                <Link href={returns}>
                  <DropdownMenuItem>
                    <span>Returns</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FaStar className={cn(iconCs, "text-yellow-400")} />
              <span>My Reviews</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Link href={toBeReviewdReviews}>
                  <DropdownMenuItem>
                    <span>To Be Reviewed</span>
                  </DropdownMenuItem>
                </Link>

                <Link href={historyReviews}>
                  <DropdownMenuItem>
                    <span>Reviews History</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <Link href={""}>
            <DropdownMenuItem>
              <FaShopify className={cn(iconCs, "text-purple-500")} />
              <span>Sell On Handouts</span>
            </DropdownMenuItem>
          </Link>

          <Link href={"/products/64bd1972b6cbecb92c110ec2"}>
            <DropdownMenuItem>
              <FaShopify className={cn(iconCs, "text-purple-500")} />
              <span>Test</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="mt-3" onClick={() => signOut()}>
          <HiLogout className={cn(iconCs, "rotate-180 text-rose-500")} />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
