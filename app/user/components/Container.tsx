import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full bg-white px-0 py-4 sm:p-4 xl:drop-shadow-lg">
      {children}
    </div>
  );
};
