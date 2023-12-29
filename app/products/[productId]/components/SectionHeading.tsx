import React from "react";
interface SectionHeadingProps {
  children: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
  return <h3 className="font-roboto text-sm text-gray-500">{children}</h3>;
};
