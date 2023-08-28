"use client";
import React from "react";
import { getAccountControlLinks } from "@/app/constants/links/AccountControlLinks";
import { AccountControl } from "./AccountControl";
import { Seperator } from "@/app/components/Seperator";

export const AccountControls = () => {
  const accountControlLinks = getAccountControlLinks();

  return (
    <div className="flex flex-col gap-0 px-0 min-[480px]:px-4 sm:px-8">
      {accountControlLinks.map((link, i) => (
        <React.Fragment key={i}>
          <AccountControl link={link} />
          <Seperator />
        </React.Fragment>
      ))}
    </div>
  );
};
