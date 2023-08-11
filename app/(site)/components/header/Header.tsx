"use client";

import React from 'react'
import { Navbar } from './components/Navbar'
import { DesktopCTANavbar } from './components/DesktopCTANavbar'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export const Header = () => {
  const pathname = usePathname();
  const isSignPage = pathname === "/user/sign";

  return (
    <>
    <div className={clsx('sm:fixed w-full z-[999]', isSignPage && "hidden md:block")}>
      <Navbar />
      <DesktopCTANavbar />
    </div>
    </>
  )
}
