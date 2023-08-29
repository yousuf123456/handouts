"use client";
import React, { useEffect, useState } from "react";

import { Heading } from "@/app/(site)/components/Heading";
import { FaMapMarkerAlt } from "react-icons/fa";
import { EmptyState } from "../../components/EmptyState";
import { AddressType } from "@/app/types";
import { AddressCard } from "@/app/components/AddressCard";
import { Button } from "@/app/components/Button";
import { HiPlus } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { SpinnerLoader } from "@/app/components/SpinnerLoader";

import {
  setAddressDiary,
  setHasBeenFetched,
} from "@/app/store/features/addressDiarySlice";

import dynamic from "next/dynamic";
import axios from "axios";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { getRoutes } from "@/app/utils/getRoutes";
import { useBreakpoint } from "@/app/hooks/useBreakpoints";

// import AddAddressFormModel from "../components/AddAddressFormModel";

const AddAddressFormModel = dynamic(
  () => import("../components/AddAddressFormModel"),
);

export const AddressDiary = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const hasBeenFetched = useAppSelector(
    (state) => state.addressDiary.hasBeenFetched,
  );

  useEffect(() => {
    if (!hasBeenFetched) {
      setIsLoading(true);
      axios
        .post("../../../api/getAddressDiary", {})
        .then((res) => {
          console.log(res.data);
          dispatch(setHasBeenFetched(true));
          dispatch(setAddressDiary(res.data?.addressDiary));
        })

        .catch((e) => console.log(e))
        .finally(() => setIsLoading(false));
    }
  }, [hasBeenFetched]);

  const [open, setOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressType>();

  const addressesArray = useAppSelector(
    (state) => state.addressDiary.addressDiary,
  );

  const noAddressIsHere = addressesArray?.length === 0;

  const onEdit = (address: AddressType) => {
    setEditingAddress(address);
    setOpen(true);
  };

  const buttonClassName =
    "absolute top-0 flex items-center gap-3 max-sm:left-1/2 max-sm:-translate-x-1/2 justify-center max-[420px]:w-full min-[420px]:w-[260px] sm:right-1";

  const width = useBreakpoint();

  const { addAddress } = getRoutes();
  return (
    <>
      <div className="flex w-full flex-col gap-12">
        <div className="relative flex w-full items-center justify-between">
          <Heading className="hidden sm:block">Address Diary</Heading>

          {width > 640 ? (
            <AddAddressFormModel
              open={open}
              setOpen={setOpen}
              editingAddress={editingAddress}
            >
              <Button
                variant={"outline"}
                onClick={() => {
                  setEditingAddress(undefined);
                  setOpen((prev) => !prev);
                }}
                className={buttonClassName}
              >
                <HiPlus className="h-5 w-5" />
                Add New Address
              </Button>
            </AddAddressFormModel>
          ) : (
            <Link href={addAddress}>
              <Button
                variant={"outline"}
                className={cn(
                  buttonClassName,
                  "hover:border-themeBlue hover:bg-transparent hover:text-themeBlue",
                )}
              >
                <HiPlus className="h-5 w-5" />
                Add New Address
              </Button>
            </Link>
          )}
        </div>

        <div className="h-full w-full">
          {isLoading ? (
            <SpinnerLoader className="mt-4 flex h-full w-full items-center justify-center pt-0" />
          ) : !addressesArray || noAddressIsHere ? (
            <EmptyState
              Icon={FaMapMarkerAlt}
              label="no addresses in your address diary"
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 max-sm:mt-4 max-sm:place-items-center sm:grid-cols-2">
              {addressesArray.map((address, i) => (
                <AddressCard
                  key={i}
                  onEdit={onEdit}
                  address={address}
                  dynamicWidth={true}
                  dynamicHeight={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
