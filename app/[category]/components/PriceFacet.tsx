"use client";
import React, { useEffect, useState } from "react";
import { FacetHeader } from "./FacetHeader";
import TextField from "@mui/material/TextField";
import { Button } from "@/app/components/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { updateSearchParam } from "@/app/utils/updateSearchParam";
import { useAppDispatch } from "@/app/store/store";
import { addSelectedFacet } from "@/app/store/features/selectedFacetsSlice";
import { Input } from "@/components/ui/input";

export const PriceFacet = () => {
  const [collapsed, setIsCollapsed] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname() || "/";

  function handleQueryChange(query: string) {
    if (searchParams?.entries()) {
      const updatedSearchParams = updateSearchParam(
        searchParams,
        "price",
        query,
        false,
        true,
      );
      router.push(`${pathName}?${updatedSearchParams.toString()}`, {
        shallow: true,
      });
    }

    dispatch(addSelectedFacet({ price: query }));
  }

  const fromError = parseInt(from) < 0;
  const toError =
    parseInt(to) < parseInt(from) || parseInt(to) === parseInt(from);

  return (
    <div className="flex flex-col gap-3">
      <FacetHeader
        facetName={"Price"}
        collapsed={collapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {!collapsed && (
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <Input
              type="number"
              value={from}
              placeholder="From"
              id="minPrice"
              onChange={(e) => setFrom(e.target.value)}
            />

            <Input
              value={to}
              type="number"
              placeholder="To"
              autoFocus={false}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <Button
            onClick={() =>
              !toError && !fromError && handleQueryChange(from + "-" + to)
            }
            className="text-xs"
            Disabled={toError || fromError}
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  );
};
