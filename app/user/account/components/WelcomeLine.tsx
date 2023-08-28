"use client";
import { Avatar } from "@/app/components/Avatar";
import { Button } from "@/app/components/Button";
import { TooltipWrapper } from "@/app/components/TooltipWrapper";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";

export const WelcomeLine = () => {
  const session = useSession();

  const isLoading = session.status === "loading";
  const isAuthenticated = session.status === "authenticated";

  return (
    <div className="mt-4 flex items-center justify-between max-[460px]:px-4">
      <div className="flex items-center gap-4">
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <Avatar image={session.data?.user?.image} />
        </div>

        <div className="flex flex-col gap-0">
          <p className="font-text text-sm text-slate-500">Welcome</p>
          <h3 className="font-text text-base font-semibold text-themeSecondary">
            {isAuthenticated ? session.data.user?.name : "To The Handouts"}
          </h3>
        </div>
      </div>

      <div>
        {!isAuthenticated ? (
          <Link href="/user/sign">
            <Button size="sm">Login / SignUp</Button>
          </Link>
        ) : (
          <TooltipWrapper content="Logout">
            <LogOut
              onClick={() => signOut()}
              className="h-6 w-6 cursor-pointer text-themeSecondary"
            />
          </TooltipWrapper>
        )}
      </div>
    </div>
  );
};
