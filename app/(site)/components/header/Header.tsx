"use client";

import React from 'react'
import { Navbar } from './components/Navbar'
import { DesktopCTANavbar } from './components/DesktopCTANavbar'
import { usePathname } from 'next/navigation';
import { cn } from '@/app/utils/cn';

export const Header = () => {
  const pathname = usePathname();
  const isSignPage = pathname === "/user/sign";

  return (
    <div className={cn('hidden sm:block sm:fixed top-0 left-0 w-full z-[999]')}>
      <Navbar />
      <DesktopCTANavbar />
    </div>
  )
}
