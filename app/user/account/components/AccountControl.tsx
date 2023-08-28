import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { HiChevronRight } from "react-icons/hi";

interface AccountControlProps {
  link: {
    label: string;
    href: string;
    icon: IconType | LucideIcon;
  };
}

export const AccountControl: React.FC<AccountControlProps> = ({ link }) => {
  return (
    <Link href={link.href}>
      <div className="flex items-center justify-between py-2 max-[460px]:px-4">
        <div className="flex items-center gap-4">
          <link.icon className="h-5 w-5 text-themeSecondary" />

          <p className="font-text text-base font-semibold text-themeSecondary">
            {link.label}
          </p>
        </div>

        <HiChevronRight className="h-4 w-4 text-slate-700" />
      </div>
    </Link>
  );
};
