import clsx from "clsx";
import React, { useEffect } from "react";

import {
  removeselectedFacet,
  setSelectedFacets,
} from "@/app/store/features/selectedFacetsSlice";
import { useAppSelector, useAppDispatch } from "@/app/store/store";
import { FaTimes } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { updateSearchParam } from "@/app/utils/updateSearchParam";

export const SelectedFacets = () => {
  const router = useRouter();
  const pathName = usePathname() || "/";
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    dispatch(setSelectedFacets(params));
  }, []);

  function handleQueryChange(name: string, query: string) {
    if (searchParams?.entries()) {
      const updatedSearchParams = updateSearchParam(
        searchParams,
        name,
        query,
        true,
      );
      router.push(`${pathName}?${updatedSearchParams.toString()}`, {
        shallow: true,
      });
    }
  }

  const dispatch = useAppDispatch();

  const selectedFacets = useAppSelector((state) => state.selectedFacets.facets);

  const deselectFacet = (key: string, value: string) => {
    dispatch(removeselectedFacet({ [key]: value }));
    handleQueryChange(key, value);
  };

  return (
    <div
      className={clsx(
        "hidden flex-wrap gap-2 md:flex",
        Object.keys(selectedFacets).length && "mt-3",
      )}
    >
      {Object.keys(selectedFacets).map((key) => (
        <div
          key={key}
          className="flex items-center gap-2 rounded-3xl bg-blue-100 px-3 py-1"
        >
          <h3 className="text-sm text-slate-500">{key + " : "}</h3>
          <div className="flex gap-2">
            {selectedFacets[key].map((value, i) => (
              <div
                key={i}
                onClick={() => deselectFacet(key, value)}
                className="group flex cursor-pointer items-center gap-0.5"
              >
                <p className="text-sm text-slate-800">
                  {" "}
                  {selectedFacets[key].length - 1 !== i ? value : value}{" "}
                </p>
                <div className="flex items-center gap-0">
                  <FaTimes className="h-3 w-3 text-red-400 transition-all group-hover:text-red-500" />
                  <p>{selectedFacets[key].length - 1 !== i && ","}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

function handleQueryChange(key: string, value: string) {
  throw new Error("Function not implemented.");
}
