"use client";
import React, { useState } from "react";

import { Seperator } from "@/app/components/Seperator";
import { DrawerComp } from "@/app/components/DrawerComp";
import { Facets } from "./Facets";
import { CategoryBreadCrumbs } from "./CategoryBreadCrumbs";

import { SelectedFacets } from "./SelectedFacets";
import { Sorts } from "./Sorts";
import { Filters } from "./Filters";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import dynamic from "next/dynamic";

const Drawer = dynamic(() => import("@/app/components/Drawer"));

interface HeaderProps {
  searchTerm: string | undefined;
  fullCategoryTree?: any;
  categoryTree: any;
  count: number;
  facets: any;
}

export const Header: React.FC<HeaderProps> = ({
  fullCategoryTree,
  categoryTree,
  searchTerm,
  facets,
  count,
}) => {
  const [open, setOpen] = useState(false);

  const getTopFiveFacets = () => {
    let topFiveFacets: any = {};

    Object.keys(facets)
      .reverse()
      .forEach((key: string, i) => {
        if (i > 4) return;

        topFiveFacets[key] = facets[key];
      });

    return topFiveFacets;
  };

  const topFiveFacets = getTopFiveFacets();

  return (
    <>
      <div className="flex flex-col gap-2 bg-white max-sm:sticky max-sm:top-0 max-sm:z-[999] max-sm:px-2 max-sm:py-3">
        <CategoryBreadCrumbs categoryTree={categoryTree} />

        <Seperator className="hidden bg-slate-200 sm:block" />

        <div className="flex w-full flex-col justify-center gap-0">
          <div className=" sticky top-0 flex w-full flex-col items-start gap-3">
            <div className="flex w-full items-center justify-between">
              <h2 className="line-clamp-1 hidden flex-shrink-0 text-sm text-slate-700 lg:block">
                Showing results for the{" "}
                <span className="text-sm font-medium text-black">
                  {searchTerm}
                </span>
              </h2>

              <Sorts filterModelOpen={open} setFilterModelOpen={setOpen} />
            </div>

            <Filters
              fullCategoryTreeData={fullCategoryTree}
              topFacets={topFiveFacets}
            />
          </div>

          <SelectedFacets />
        </div>

        <Seperator className="hidden bg-slate-200 sm:block" />
      </div>

      <Drawer className="max-[420px]:w-[85%]" open={open} setOpen={setOpen}>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <Facets facets={facets} categoryTreeData={fullCategoryTree} />
      </Drawer>
    </>
  );
};
