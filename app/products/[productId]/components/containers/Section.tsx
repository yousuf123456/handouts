import clsx from "clsx";
import React from "react";

export const Section = ({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: "full" | "padding";
}) => {
  return (
    <div className={clsx(mode === "padding" && "max-sm:px-2")}>
      <div
        className={clsx(
          mode === "full"
            ? "max-sm:bg-white max-sm:px-4 max-sm:py-2"
            : "max-sm:rounded-md max-sm:bg-white max-sm:p-2",
        )}
      >
        {children}
      </div>
    </div>
  );
};
