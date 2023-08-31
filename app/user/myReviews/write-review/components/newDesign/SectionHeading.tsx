import React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
  return (
    <h4 className="flex-shrink-0 font-text text-base font-semibold text-black">
      {children}
    </h4>
  );
};
