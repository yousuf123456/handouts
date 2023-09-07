import React from "react";
import { Questions } from "./components/Questions";
import { BreadCrumbs } from "@/app/user/orders/components/BreadCrumbs";
import { NavigationPanel } from "@/app/components/NavigationPanel";

interface SearchParams {
  page?: string | undefined;
  cursor?: string | undefined;
  prevPage?: string | undefined;
}

interface IParams {
  productId: string;
}

export default async function ProductQuestionsPage({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: IParams;
}) {
  return (
    <div className="bg-white px-3 py-6 md:px-8 lg:px-12 xl:px-16">
      <NavigationPanel heading="Product Questions" />
      <Questions
        productId={params.productId}
        cursor={searchParams.cursor}
        page={parseInt(searchParams.page || "0")}
        prevPage={parseInt(searchParams.prevPage || "0")}
      />
    </div>
  );
}
