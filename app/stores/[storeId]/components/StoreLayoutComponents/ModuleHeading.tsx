import React from "react";

interface ModuleHeadingProps {
  heading: string;
}

export const ModuleHeading: React.FC<ModuleHeadingProps> = ({ heading }) => {
  return (
    <h2 className="font-text text-base font-semibold text-themeSecondary md:text-lg">
      {heading}
    </h2>
  );
};
