import React from "react";
import { ModuleHeading } from "./ModuleHeading";

interface ModuleProps {
  moduleHeading?: string;
  children: React.ReactNode;
  hideModuleHeading?: boolean;
  withoutModuleHeading?: boolean;
}

export const Module: React.FC<ModuleProps> = ({
  withoutModuleHeading,
  hideModuleHeading,
  moduleHeading,
  children,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {!withoutModuleHeading && moduleHeading && !hideModuleHeading && (
        <ModuleHeading heading={moduleHeading} />
      )}

      {children}
    </div>
  );
};
