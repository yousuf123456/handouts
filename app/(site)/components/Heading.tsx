import clsx from "clsx";
import React, { ReactNode } from "react";

export const Heading = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={clsx(
        "font-heading text-sm font-bold text-themeSecondary sm:text-base md:text-lg",
        className,
      )}
    >
      {children}
    </h2>
  );
};
