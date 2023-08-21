"use client";

import React from 'react'
import { Navbar } from './components/Navbar'
import { DesktopCTANavbar } from './components/DesktopCTANavbar'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { BREAKPOINT } from '@/app/constants/consts';
import { useBreakpoint } from '@/app/hooks/useBreakpoints';

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
