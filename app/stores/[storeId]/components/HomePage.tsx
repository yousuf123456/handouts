import React from "react";
import { StorePageLayout } from "./StorePageLayout";
import { LayoutComponentType } from "@/app/types";

export const HomePage = async ({
  storeId,
  layout,
}: {
  storeId: string;
  layout: LayoutComponentType[];
}) => {
  return <StorePageLayout layout={layout} storeId={storeId} />;
};
