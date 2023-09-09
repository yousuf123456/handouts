"use client";
import { Avatar } from "@/app/components/Avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/store/store";
import { setCartItemsCount } from "@/app/store/features/cartSlice";
import dynamic from "next/dynamic";

const ProfileDropDownMenu = dynamic(() => import("./ProfileDropDownMenu"));

export const SignCta = () => {
  const [hasSetCount, setHasSetCount] = useState(false);

  const session = useSession();
  const isLoggedIn = session.status === "authenticated";
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session.status === "authenticated" && !hasSetCount) {
      dispatch(setCartItemsCount(session.data.user?.cartItemsCount!));
      setHasSetCount((prev) => true);
      console.log("Dispatching ", session.data.user?.cartItemsCount);
    }
  }, [session.status]);

  return (
    <div>
      {isLoggedIn ? (
        <ProfileDropDownMenu>
          <div className="flex cursor-pointer items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <Avatar image={session.data.user?.image} />
            </div>

            <p className="hidden font-text font-semibold text-white sm:block">
              {session.data.user?.phone || session.data.user?.name}
            </p>
          </div>
        </ProfileDropDownMenu>
      ) : (
        <div className="flex h-full items-center gap-2 sm:gap-4">
          <Link href={"/user/sign?type=SIGN%20IN"}>
            <p className="cursor-pointer font-text text-sm font-bold hover:text-indigo-800">
              Login
            </p>
          </Link>

          <p>|</p>

          <Link href={"/user/sign?type=SIGN%20UP"}>
            <p className="cursor-pointer whitespace-nowrap font-text text-sm font-bold hover:text-indigo-800">
              Sign Up
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};
