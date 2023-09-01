"use client";
import React, { useState } from "react";

import { SidebarItem } from "./SidebarItem";

import {
  HiCash,
  HiTruck,
  HiHeart,
  HiLogout,
  HiStar,
  HiChevronRight,
} from "react-icons/hi";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { RiArrowGoBackFill, RiUser5Fill } from "react-icons/ri";
import { cn } from "@/app/utils/cn";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { setSidebarOpen } from "@/app/store/features/profileSideBar";

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.profileSidebar.open);
  const closeSideBar = () => dispatch(setSidebarOpen(false));
  const openSideBar = () => dispatch(setSidebarOpen(true));

  return (
    <div
      onMouseEnter={openSideBar}
      onMouseLeave={closeSideBar}
      className={cn(
        "flex-shrink-0 rounded-sm bg-white transition-all duration-300 max-xl:border-r-2 lg:w-60 xl:w-64",
        open ? "w-[224px]" : "w-[58px]",
      )}
    >
      <div className="flex w-full flex-col justify-between gap-12 px-2 py-3 lg:px-4 lg:py-6">
        <div className="flex w-full flex-col gap-4 lg:gap-2">
          <div
            onClick={() => dispatch(setSidebarOpen(!open))}
            className="flex w-full flex-shrink-0 justify-center rounded-full bg-themeBlue p-1 lg:hidden"
          >
            <HiChevronRight
              className={clsx(
                "h-5 w-5 text-white transition-all",
                open && "rotate-180",
              )}
            />
          </div>

          <SidebarItem
            isOpen={open}
            Icon={RiUser5Fill}
            label="My Profile"
            href="/user/profile"
          />

          <SidebarItem
            Icon={FaMapMarkerAlt}
            isOpen={open}
            href="/user/addressDiary"
            label="Adress Diary"
          />

          <SidebarItem
            Icon={HiCash}
            href="/user/paymentsDiary"
            isOpen={open}
            label="Payments Diary"
          />

          <SidebarItem
            Icon={HiTruck}
            isOpen={open}
            href="/user/orders"
            label="My Orders"
          />

          <SidebarItem
            Icon={RiArrowGoBackFill}
            isOpen={open}
            href="/user/returns"
            label="My Returns"
          />

          <SidebarItem
            Icon={FaTimes}
            isOpen={open}
            href="/user/cancellations"
            label="My Cancellations"
          />

          <SidebarItem
            Icon={HiStar}
            isOpen={open}
            href="/user/myReviews?toBeReviewed=true&isHistory=false"
            label="My Reviews"
          />

          <SidebarItem
            Icon={HiHeart}
            isOpen={open}
            href="/favourites"
            label="My Favourites"
          />
        </div>

        <div>
          <SidebarItem
            Icon={HiLogout}
            isOpen={open}
            label="Logout"
            href="nothing"
            isLogout={true}
          />
        </div>
      </div>
    </div>
  );
};
