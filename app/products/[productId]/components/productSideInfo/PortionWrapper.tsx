import React from "react";

interface PortionWrapperProps {
  children: React.ReactNode;
  portionName: string;
}

export const PortionWrapper: React.FC<PortionWrapperProps> = ({
  children,
  portionName,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium text-black">{portionName}</p>
      {children}
    </div>
  );
};
