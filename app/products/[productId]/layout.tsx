import React from "react";

export const revalidate = 3600;

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
