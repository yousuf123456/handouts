import React from "react";
import { NavigationPanel } from "@/app/components/NavigationPanel";
import { StoreProfile } from "./components/StoreProfile";

interface IParams {
  storeId: string;
}

export default function StoreProfilePage({
  params,
  searchParams,
}: {
  params: IParams;
  searchParams: any;
}) {
  return (
    <div>
      <NavigationPanel heading="Store Profile" />

      <StoreProfile searchParams={searchParams} storeId={params.storeId} />
    </div>
  );
}
