import React from "react";

import { IParams } from "../types";

import { getCategory } from "../actions/getCategory";
import { formatCategoryParam } from "../utils/formatCategoryParam";
import { SearchedTermResults } from "./components/SearchedTermResults";
import { NavigationPanel } from "../components/NavigationPanel";

interface Params {
  category: string;
}

export default async function SearchPage({
  searchParams,
  params,
}: {
  searchParams: IParams;
  params: Params;
}) {
  // const data = await searchProducts(searchParams, params.category);

  const categoryData =
    params.category !== "search"
      ? await getCategory({
          category: formatCategoryParam({
            toRetrieve: true,
            category: params.category,
          }),
        })
      : null;
  // const categoryTreeData = categoryData ? getCategoryTree(categoryData.rawCategoryData, null) : null;
  // const fullCategoryTreeData = categoryData ? getCategoryTree([...categoryData.rawCategoryData, ...categoryData.descendants], categoryData.parent.parentId) : null;

  // const body = {
  //   searchTerm : searchParams.q,
  //   category : params.category
  // }

  // const res = await fetch("https://handouts-21hc2v6ov-muhammadyousuf554456-gmailcom.vercel.app/api/getFacets", {
  //   method : "POST",
  //   body : JSON.stringify(body)
  // });

  // const facetsData = await res.json();

  return (
    <div>
      <NavigationPanel showSearchBar={true} />
      <SearchedTermResults
        searchParams={searchParams}
        categoryData={categoryData}
        category={params.category}
      />
    </div>
  );
}
