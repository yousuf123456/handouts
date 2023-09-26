import React from "react";
import { UserProvider as Auth0UserProvider } from "@auth0/nextjs-auth0/client";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  return <Auth0UserProvider>{children}</Auth0UserProvider>;
};
