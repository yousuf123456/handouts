"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/app/components/Button";
import { FormatAddress } from "@/app/components/FormatAddress";
import { AddressType } from "@/app/types";
import { Prisma } from "@prisma/client";

import { EditEmailModel } from "./EditEmailModel";
import { useAppDispatch, useAppSelector } from "@/app/store/store";

import {
  setSelectedBillingAddress,
  setSelectedShippingAddress,
  setEmail,
} from "../../store/features/shippingSlice";

import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  setAddressDiary,
  setHasBeenFetched,
} from "@/app/store/features/addressDiarySlice";
import clsx from "clsx";
import { SpinnerLoader } from "@/app/components/SpinnerLoader";
const EditAddressModel = dynamic(() => import("./EditAddressModel"));

interface AddressInfoProps {}

export const AddressInfo: React.FC<AddressInfoProps> = ({}) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const hasBeenFetched = useAppSelector(
    (state) => state.addressDiary.hasBeenFetched,
  );

  useEffect(() => {
    if (!hasBeenFetched) {
      setIsLoading(true);
      axios
        .post("../../api/getAddressDiary")
        .then((res) => {
          dispatch(setHasBeenFetched(true));
          dispatch(setAddressDiary(res.data.addressDiary));
        })
        .catch((e) => console.log(e))
        .finally(() => setIsLoading(false));
    }
  }, [hasBeenFetched]);

  const [delieveryAddressesOpen, setDelieveryAddressesOpen] = useState(false);
  const [billingAddressesOpen, setBillingAddressesOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);

  const addresses = useAppSelector((state) => state.addressDiary.addressDiary);
  const session = useSession();
  const noAddressIsHere = addresses?.length === 0;

  const defaultShippingAddress = addresses?.filter(
    (address) => address.isDefaultShippingAddress,
  );
  const defaultBillingAddress = addresses?.filter(
    (address) => address.isDefaultBillingAddress,
  );

  useEffect(() => {
    dispatch(
      setSelectedShippingAddress(
        defaultShippingAddress?.length ? defaultShippingAddress[0] : undefined,
      ),
    );
    dispatch(
      setSelectedBillingAddress(
        defaultBillingAddress?.length ? defaultBillingAddress[0] : undefined,
      ),
    );
    dispatch(setEmail(session.data?.user?.email));
  }, [addresses]);

  const selectedShippingAddress = useAppSelector(
    (state) => state.shipping.selectedShippingAddress,
  );
  const selectedBillingAddress = useAppSelector(
    (state) => state.shipping.selectedBillingAddress,
  );
  const email = useAppSelector((state) => state.shipping.email);

  const billingLabel = () => {
    const className = "text-xs font-text text-white line-clamp-1";
    if (selectedBillingAddress?.address === selectedShippingAddress?.address)
      return <p className={className}>Bill to the same address</p>;
    if (selectedBillingAddress?.isDefaultBillingAddress)
      return <p className={className}>Bill to the default billing address</p>;

    return (
      <FormatAddress
        rawAddress={selectedBillingAddress}
        className={className}
        prefix="Bill to the "
      />
    );
  };
  const emailToLabel = email
    ? "Email to " + email
    : "Enter your email to get order updates";

  const editClassName =
    "text-xs font-text text-green-500 cursor-pointer transition-all hover:opacity-60";

  if (noAddressIsHere || isLoading || session.status === "loading") {
    const loading = isLoading || session.status === "loading";
    return (
      <div
        className={clsx(
          "flex h-36 w-full items-center justify-center sm:w-[460px]",
        )}
      >
        {loading ? (
          <SpinnerLoader
            className="mt-0 flex h-36 w-[460px] items-center justify-center rounded-sm pt-0 shadow-whiteCardShadow"
            color="white"
            size="1.5rem"
          />
        ) : (
          <Button className="bg-white font-semibold text-slate-900 hover:bg-white hover:bg-opacity-80 hover:text-slate-900">
            Add New Address
          </Button>
        )}
      </div>
    );
  }
  return (
    <>
      <div className="min-h-36 w-full rounded-sm shadow-whiteCardShadow sm:w-[460px]">
        <div className="flex h-full w-full flex-col gap-4 p-3">
          <div className="flex items-center justify-between">
            <h3 className="font-text text-xs text-white">
              {"Deliever To :  " + selectedShippingAddress?.fullName}
            </h3>

            <p
              onClick={() => setDelieveryAddressesOpen(true)}
              className={editClassName}
            >
              Change
            </p>

            <EditAddressModel
              title="Delievery Address"
              open={delieveryAddressesOpen}
              setOpen={setDelieveryAddressesOpen}
              addressDiary={addresses}
              selectedAddress={selectedShippingAddress}
              onClick={(address) =>
                dispatch(setSelectedShippingAddress(address))
              }
            />
          </div>

          <div className="flex items-start gap-1 max-sm:flex-col sm:items-center sm:gap-2">
            <div className="rounded-[2px] bg-white px-1 py-0.5">
              <p className="font-text text-xs text-black">
                {selectedShippingAddress?.type}
              </p>
            </div>

            <p className="font-text text-xs text-white max-sm:order-3">
              {selectedShippingAddress?.phone}
            </p>

            <p className="hidden text-white sm:block">|</p>

            <FormatAddress
              rawAddress={selectedShippingAddress}
              className="line-clamp-3 font-text text-xs text-white"
            />
          </div>

          <div className="flex flex-col gap-4 max-sm:mt-3 sm:gap-1">
            <div className="flex items-center justify-between">
              {billingLabel()}
              <p
                onClick={() => setBillingAddressesOpen(true)}
                className={editClassName}
              >
                Edit
              </p>
              <EditAddressModel
                title="Billing Address"
                open={billingAddressesOpen}
                setOpen={setBillingAddressesOpen}
                addressDiary={addresses}
                selectedAddress={selectedBillingAddress}
                onClick={(address) =>
                  dispatch(setSelectedBillingAddress(address))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="font-text text-xs text-white">{emailToLabel}</p>

              <p onClick={() => setEmailOpen(true)} className={editClassName}>
                Edit
              </p>
              <EditEmailModel
                email={email}
                open={emailOpen}
                setOpen={setEmailOpen}
                onSave={(newEmail: string | null | undefined) =>
                  dispatch(setEmail(newEmail))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
