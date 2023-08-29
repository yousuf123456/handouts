"use client";
import React, { useEffect } from "react";

import { AccountControls } from "./components/AccountControls";
import { WelcomeLine } from "./components/WelcomeLine";
import { Seperator } from "@/app/components/Seperator";
import { NavigationPanel } from "@/app/components/NavigationPanel";
import { useRouter } from "next/navigation";

export default function AccountsPage() {
  const router = useRouter();
  useEffect(() => {
    if (window.innerWidth > 640) router.push("/user/profile");
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white px-0 py-4 min-[460px]:px-4 sm:px-8">
      <NavigationPanel heading="My Account" />
      <WelcomeLine />
      <Seperator />
      <AccountControls />
    </div>
  );
}
