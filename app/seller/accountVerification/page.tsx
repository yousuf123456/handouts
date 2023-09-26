//Moved To A New Website

import React from "react";
import { AccountVerificationForm } from "./components/AccountVerificationForm";
import { Handouts } from "./components/Handouts";

export default function AccountVerificationPage() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="px-16 pb-8">
        <Handouts />
      </div>

      <AccountVerificationForm />
    </div>
  );
}
