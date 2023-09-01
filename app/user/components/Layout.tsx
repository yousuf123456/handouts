import React, { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { ReduxProvider } from "@/app/context/ReduxProvider";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-full w-full bg-white md:bg-slate-100 xl:mt-4">
      <div className="flex w-full gap-0 p-4 xl:gap-6 xl:px-12 xl:py-6">
        <div className="hidden h-full md:block">
          <ReduxProvider>
            <Sidebar />
          </ReduxProvider>
        </div>

        {children}
      </div>
    </div>
  );
};
