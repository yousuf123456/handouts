"use client";

import React from "react";
import { ProfileDropDownMenu } from "./ProfileDropDownMenu";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useRouter } from "next/navigation";

interface BannerNavPanelProps {
  heading: string;
  onBackHref?: string;
}

export const BannerNavPanel: React.FC<BannerNavPanelProps> = ({
  heading,
  onBackHref,
}) => {
  const router = useRouter();
  const onBack = () => (onBackHref ? router.push(onBackHref) : router.back());

  return (
    <div className="flex w-full items-center justify-between px-6 sm:hidden">
      <div
        className="cursor-pointer rounded-sm bg-white p-0.5"
        onClick={onBack}
      >
        <HiChevronLeft className="h-6 w-6 text-slate-900" />
      </div>

      <h3 className="font-text text-lg font-medium text-white">{heading}</h3>

      <ProfileDropDownMenu includeAllLinks={true}>
        <div>
          <HiEllipsisVertical className="h-6 w-6 text-white" />
        </div>
      </ProfileDropDownMenu>
    </div>
  );
};
