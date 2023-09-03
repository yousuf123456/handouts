import React from "react";

export const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="font-text text-sm font-semibold text-black md:text-base">
      {children}
    </h3>
  );
};
