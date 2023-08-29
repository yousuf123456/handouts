"use client";
import React, { useEffect, useState } from "react";
import { FormField } from "./FormField";
import { Seperator } from "@/app/components/Seperator";
import { AddressTypeButton } from "../../addressDiary/components/AddressTypeButton";
import { FlagSelector } from "../../addressDiary/components/FlagSelector";
import { Button } from "@/app/components/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AreaSelector } from "./AreaSelector";
import clsx from "clsx";
import { AddressType } from "@/app/types";
import axios from "axios";
import {
  addAddress,
  replaceWithNewAddress,
} from "@/app/store/features/addressDiarySlice";
import { useAppDispatch } from "@/app/store/store";
import BackdropLoader from "@/app/components/BackdropLoader";
import { useRouter } from "next/navigation";

interface FormProps {
  editingAddress: AddressType | undefined;
}

export const Form: React.FC<FormProps> = ({ editingAddress }) => {
  const initialIsDefaultShippingAddress = editingAddress
    ? editingAddress.isDefaultShippingAddress
    : false;
  const initialIsDefaultBilligAddress = editingAddress
    ? editingAddress.isDefaultBillingAddress
    : false;
  const initialProvince = editingAddress ? editingAddress.province : "";
  const initialLandmark = editingAddress ? editingAddress.landmark : "";
  const initialAddressType = editingAddress ? editingAddress.type : "";
  const initialAddress = editingAddress ? editingAddress.address : "";
  const initialName = editingAddress ? editingAddress.fullName : "";
  const initialPhone = editingAddress ? editingAddress.phone : "";
  const initialCity = editingAddress ? editingAddress.city : "";
  const initialArea = editingAddress ? editingAddress.area : "";
  const [isLoading, setIsLoading] = useState(false);

  const [selectedProvince, setSelectedProvince] = useState(initialProvince);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedArea, setSelectedArea] = useState(initialArea);

  const [confirmSelectedProvince, setConfirmSelectedProvince] =
    useState(initialProvince);
  const [confirmSelectedCity, setConfirmSelectedCity] = useState(initialCity);
  const [confirmSelectedArea, setConfirmSelectedArea] = useState(initialArea);

  const [selectedType, setSelectedType] = useState<"Home" | "Office" | "">(
    initialAddressType,
  );

  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState(
    initialIsDefaultShippingAddress,
  );
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(
    initialIsDefaultBilligAddress,
  );

  console.log(editingAddress);

  const fieldsSectionCs = "flex flex-col gap-3 p-3 border-[1px] rounded-md";

  const onHomeClick = () =>
    selectedType !== "Home" ? setSelectedType("Home") : setSelectedType("");
  const onOfficeClick = () =>
    selectedType !== "Office" ? setSelectedType("Office") : setSelectedType("");

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      fullName: initialName,
      address: initialAddress,
      phone: initialPhone,
      landmark: initialLandmark,
    },
  });

  const everyThingFilled =
    isValid &&
    !!confirmSelectedProvince.length &&
    !!confirmSelectedCity.length &&
    !!confirmSelectedArea.length;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const address = {
      ...data,
      area: confirmSelectedArea,
      city: confirmSelectedCity,
      province: confirmSelectedProvince,
      type: selectedType.length ? selectedType : "Home",
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
        router.push("/user/addressDiary");
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6 pb-12">
        <div className={fieldsSectionCs}>
          <FormField
            id="fullName"
            required={true}
            label="Full Name"
            register={register}
            placeHolder="E.g., Aryan Ahmed"
          />
          <FormField
            id="phone"
            label="Phone"
            required={true}
            register={register}
            placeHolder="Type your phone number"
          />
        </div>

        <div className={fieldsSectionCs}>
          <AreaSelector
            selectedProvince={selectedProvince}
            selectedArea={selectedArea}
            selectedCity={selectedCity}
            setSelectedProvince={setSelectedProvince}
            setSelectedArea={setSelectedArea}
            setSelectedCity={setSelectedCity}
            confirmSelectedProvince={confirmSelectedProvince}
            confirmSelectedCity={confirmSelectedCity}
            confirmSelectedArea={confirmSelectedArea}
            setConfirmSelectedProvince={setConfirmSelectedProvince}
            setConfirmSelectedArea={setConfirmSelectedArea}
            setConfirmSelectedCity={setConfirmSelectedCity}
          />

          <FormField
            id="address"
            label="Address"
            required={true}
            register={register}
            placeHolder="House no. / building / street / area"
          />
          <FormField
            id="landmark"
            register={register}
            label="Landmark (optional)"
            placeHolder="E.g., Besides the train station"
          />
        </div>

        <div className={fieldsSectionCs}>
          <div className="flex flex-col gap-1">
            <p className="font-sans text-sm font-semibold text-themeSecondary">
              Select Address Type
            </p>
            <div className="flex justify-between gap-3">
              <AddressTypeButton
                onClick={onHomeClick}
                isSelected={selectedType === "Home"}
                label="Home"
              />

              <AddressTypeButton
                onClick={onOfficeClick}
                isSelected={selectedType === "Office"}
                label="Office"
              />
            </div>
          </div>
          <div className="flex flex-col gap-0">
            <FlagSelector
              flagLabel="Default shipping address"
              setFlag={setIsDefaultShippingAddress}
              defaultChecked={isDefaultShippingAddress}
            />

            <FlagSelector
              flagLabel="Default billing address"
              setFlag={setIsDefaultBillingAddress}
              defaultChecked={isDefaultBillingAddress}
            />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0">
          <Button
            type="submit"
            disabled={!everyThingFilled}
            className={clsx(
              "h-9 w-full",
              !everyThingFilled &&
                "bg-blue-200 text-slate-700 hover:bg-blue-200",
            )}
          >
            Create New Address
          </Button>
        </div>
      </div>

      <BackdropLoader open={isLoading} />
    </form>
  );
};
