"use client";
import React, { useEffect, useState } from "react";

import { Input2 } from "@/app/components/Input2";
import { SelectOptions } from "@/app/components/SelectOptions";
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { AddressTypeButton } from "./AddressTypeButton";
import { FlagSelector } from "./FlagSelector";

import citiesList from "../../../assets/cities.json";
import { areas, provinces } from "@/app/constants/selectOptions";

interface FormInputsProps {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  setIsDefaultBillingAddress: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDefaultShippingAddress: React.Dispatch<React.SetStateAction<boolean>>;
  control: Control<FieldValues, any>;
  isLoading: boolean;
  selectedType: string;
  editingAddressIsDefaultBillingAddress: boolean | undefined;
  editingAddressIsDefaultShippingAddress: boolean | undefined;
}

export const FormInputs: React.FC<FormInputsProps> = ({
  editingAddressIsDefaultBillingAddress,
  editingAddressIsDefaultShippingAddress,
  setIsDefaultBillingAddress,
  setIsDefaultShippingAddress,
  setSelectedType,
  register,
  watch,
  control,
  isLoading,
  selectedType,
}) => {
  const [cities, setCities] = useState<string[]>([]);

  const provinceSelected = watch("province");
  const citySelected = watch("city");

  useEffect(() => {
    console.log(provinceSelected);
  }, [provinceSelected]);

  useEffect(() => {
    if (provinceSelected) {
      if (provinceSelected === "Islamabad") setCities(["Islamabad"]);
      else
        setCities(
          citiesList
            .filter(
              (cityData) =>
                cityData.admin_name.toLowerCase() ===
                provinceSelected.toLowerCase(),
            )
            .map((cityData) => cityData.city),
        );
    }
  }, [provinceSelected]);

  return (
    <div className="mt-6 flex flex-col gap-8">
      <div className="flex w-full gap-8">
        <Input2
          id="fullName"
          type="text"
          label="Full Name"
          placeholder="E.g. Aryan Ahmed"
          required={true}
          register={register}
          watch={watch}
        />

        <Input2
          id="address"
          type="text"
          label="Address"
          placeholder="House no / building / street / area"
          required={true}
          register={register}
          watch={watch}
        />
      </div>

      <div className="flex w-full gap-8">
        <Input2
          id="phone"
          type="number"
          label="Phone"
          placeholder="Enter Your Phone Number"
          required={true}
          register={register}
          watch={watch}
        />

        <Input2
          id="landmark"
          type="text"
          label="Landmark (optional)"
          placeholder="E.g. Near the airport"
          required={false}
          register={register}
          watch={watch}
        />
      </div>

      <div className="flex w-full gap-8">
        <div className="flex w-full flex-col gap-1">
          <p className="font-text text-xs font-semibold text-slate-600">
            Province
          </p>
          <Controller
            control={control}
            name="province"
            render={({ field }) => (
              <SelectOptions
                field={field}
                isLoading={isLoading}
                disabled={isLoading}
                required={true}
                options={provinces}
                placeHolder="Select A Province"
                label="Provinces"
              />
            )}
          />
        </div>

        <div className="flex w-full flex-col gap-1">
          <p className="font-text text-xs font-semibold text-slate-600">
            {"Type (optional)"}
          </p>
          <div className="flex w-full gap-3">
            <AddressTypeButton
              label="Home"
              onClick={() =>
                selectedType !== "Home"
                  ? setSelectedType("Home")
                  : setSelectedType("")
              }
              isSelected={selectedType === "Home"}
            />
            <AddressTypeButton
              label="Office"
              onClick={() =>
                selectedType !== "Office"
                  ? setSelectedType("Office")
                  : setSelectedType("")
              }
              isSelected={selectedType === "Office"}
            />
          </div>
        </div>
      </div>

      <div className="flex w-full gap-8">
        <div className="flex h-full w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-1">
            <p className="font-text text-xs font-semibold text-slate-600">
              City
            </p>
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <SelectOptions
                  field={field}
                  isLoading={isLoading}
                  required={true}
                  disabled={!provinceSelected || isLoading}
                  options={cities}
                  placeHolder="Select A City"
                  label="Cities"
                />
              )}
            />
          </div>

          <div className="flex w-full flex-col gap-1">
            <p className="font-text text-xs font-semibold text-slate-600">
              Area
            </p>
            <Controller
              control={control}
              name="area"
              render={({ field }) => (
                <SelectOptions
                  field={field}
                  isLoading={isLoading}
                  required={true}
                  disabled={!citySelected || isLoading}
                  options={areas}
                  placeHolder="Select Area"
                  label="Areas"
                />
              )}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-1">
          <p className="font-text text-xs font-semibold text-slate-600">
            Default Settings
          </p>

          <div className="rounded-sm border-2 p-2">
            <FlagSelector
              flagLabel="Default shipping address"
              setFlag={setIsDefaultShippingAddress}
              defaultChecked={
                editingAddressIsDefaultShippingAddress ? true : false
              }
            />

            <FlagSelector
              flagLabel="Default billing address"
              setFlag={setIsDefaultBillingAddress}
              defaultChecked={
                editingAddressIsDefaultBillingAddress ? true : false
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
