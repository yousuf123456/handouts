import React from "react";
import { Questions } from "./components/Questions";
import { NavigationPanel } from "@/app/components/NavigationPanel";

interface SearchParams {
  page?: string | undefined;
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
  console.log("Hi I am rendered");
  return (
    <div className="bg-white px-3 py-6 md:px-8 lg:px-12 xl:px-16">
      <NavigationPanel heading="Product Questions" />
      <Questions
        productId={params.productId}
        page={parseInt(searchParams.page || "0")}
      />
    </div>
  );
}
