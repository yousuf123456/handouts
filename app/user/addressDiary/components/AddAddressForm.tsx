"use client";
import React, { useState } from "react";

import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { FormInputs } from "./FormInputs";
import { LoadingButton } from "@/app/components/LoadingButton";

import { AddressType } from "@/app/types";
import { useAppDispatch } from "@/app/store/store";
import {
  addAddress,
  removeAddress,
  replaceWithNewAddress,
} from "@/app/store/features/addressDiarySlice";
import { FaTrash } from "react-icons/fa";

import axios from "axios";
import clsx from "clsx";

interface AddAddressFormProps {
  editingAddress: AddressType | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddAddressForm: React.FC<AddAddressFormProps> = ({
  setOpen,
  editingAddress,
}) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [selectedType, setSelectedType] = useState(
    editingAddress ? editingAddress.type : "",
  );
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState(
    editingAddress ? editingAddress.isDefaultShippingAddress : false,
  );
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(
    editingAddress ? editingAddress.isDefaultBillingAddress : false,
  );

  const { register, watch, handleSubmit, control } = useForm<FieldValues>({
    defaultValues: {
      fullName: editingAddress ? editingAddress.fullName : "",
      address: editingAddress ? editingAddress.address : "",
      phone: editingAddress ? editingAddress.phone : "",
      landmark: editingAddress ? editingAddress.landmark : "",
      province: editingAddress ? editingAddress.province : undefined,
      city: editingAddress ? editingAddress.city : undefined,
      area: editingAddress ? editingAddress.area : undefined,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const address = {
      ...data,
      type: selectedType,
      isDefaultBillingAddress: isDefaultBillingAddress,
      isDefaultShippingAddress: isDefaultShippingAddress,
    } as AddressType;

    setIsLoading(true);
    axios
      .post("../../../api/addAddress", {
        address,
        editAddress: editingAddress ? true : false,
      })
      .then((res) => {
        dispatch(
          editingAddress ? replaceWithNewAddress(address) : addAddress(address),
        );
        setOpen(false);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };

  const onDelete = () => {
    if (!editingAddress) return;

    setIsLoading2(true);
    axios
      .post("../../../api/removeAddress", {
        address: editingAddress,
      })
      .then((res) => {
        dispatch(removeAddress(editingAddress));
        setOpen(false);
      })
      .finally(() => setIsLoading2(false));
  };

  const canBeDeleted =
    editingAddress &&
    !editingAddress.isDefaultBillingAddress &&
    !editingAddress.isDefaultShippingAddress;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-full w-full flex-col gap-10">
        <FormInputs
          register={register}
          watch={watch}
          control={control}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          setIsDefaultBillingAddress={setIsDefaultBillingAddress}
          setIsDefaultShippingAddress={setIsDefaultShippingAddress}
          isLoading={isLoading}
          editingAddressIsDefaultBillingAddress={
            editingAddress?.isDefaultBillingAddress
          }
          editingAddressIsDefaultShippingAddress={
            editingAddress?.isDefaultShippingAddress
          }
        />

        <div
          className={clsx(
            "flex",
            canBeDeleted ? "justify-between" : "justify-end",
          )}
        >
          {canBeDeleted && (
            <LoadingButton
              className="flex items-center gap-3 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500"
              type="button"
              onClick={onDelete}
              isLoading={isLoading2}
              disabled={isLoading2}
            >
              <FaTrash className="h-4 w-4 text-red-500" />
              Delete Address
            </LoadingButton>
          )}

          <LoadingButton
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {editingAddress ? "Save" : "Create Address"}
          </LoadingButton>
        </div>
      </div>
    </form>
  );
};
