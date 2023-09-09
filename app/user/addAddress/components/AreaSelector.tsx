"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

import Drawer from "@/app/components/Drawer";
import { Input } from "@/components/ui/input";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FaCheckCircle } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";
import citiesList from "@/app/assets/cities.json";
import { areas, provinces } from "@/app/constants/selectOptions";
import { Seperator } from "@/app/components/Seperator";
import { Button } from "@/app/components/Button";

interface AreaSelectorProps {
  selectedProvince: string;
  selectedCity: string;
  selectedArea: string;

  setSelectedProvince: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  setSelectedArea: React.Dispatch<React.SetStateAction<string>>;

  confirmSelectedProvince: string;
  confirmSelectedCity: string;
  confirmSelectedArea: string;

  setConfirmSelectedProvince: React.Dispatch<React.SetStateAction<string>>;
  setConfirmSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  setConfirmSelectedArea: React.Dispatch<React.SetStateAction<string>>;
}

export const AreaSelector: React.FC<AreaSelectorProps> = ({
  selectedProvince,
  selectedCity,
  selectedArea,
  confirmSelectedProvince,
  confirmSelectedArea,
  confirmSelectedCity,

  setSelectedProvince,
  setSelectedCity,
  setSelectedArea,
  setConfirmSelectedProvince,
  setConfirmSelectedArea,
  setConfirmSelectedCity,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectingSteps = ["Province", "City", "Area"];

  const initialCurrentSelectingStep = selectedArea
    ? "Area"
    : selectedCity
    ? "City"
    : "Province";
  const [currentSelectingStep, setCurrentSelectingStep] = useState<
    "Province" | "City" | "Area"
  >(initialCurrentSelectingStep);

  const onProvinceClick = () => setCurrentSelectingStep("Province");
  const onCityClick = () => setCurrentSelectingStep("City");
  const onAreaClick = () => setCurrentSelectingStep("Area");

  const onItemClick = (value: string) => {
    if (currentSelectingStep === "Province") setSelectedProvince(value);
    if (currentSelectingStep === "City") setSelectedCity(value);
    if (currentSelectingStep === "Area") setSelectedArea(value);

    if (currentSelectingStepIndex !== selectingSteps.length - 1)
      //@ts-ignore
      setCurrentSelectingStep(selectingSteps[currentSelectingStepIndex + 1]);
  };

  const onStepClick = (step: "Province" | "City" | "Area") => {
    selectingSteps.forEach((step, i) => {
      if (i >= currentSelectingStepIndex) {
        if (step === "Province") setSelectedProvince("");
        if (step === "City") setSelectedCity("");
        if (step === "Area") setSelectedArea("");
      }
    });

    if (step === "Province") onProvinceClick();
    if (step === "City") onCityClick();
    if (step === "Area") onAreaClick();
  };

  const onConfirm = () => {
    setConfirmSelectedProvince(selectedProvince);
    setConfirmSelectedArea(selectedArea);
    setConfirmSelectedCity(selectedCity);

    setIsOpen(false);
  };

  const currentSelectingStepIndex =
    selectingSteps.indexOf(currentSelectingStep);

  const onAreaSelectorClick = () => setIsOpen(true);

  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    if (selectedProvince) {
      if (selectedProvince === "Islamabad") setCities(["Islamabad"]);
      else
        setCities(
          citiesList
            .filter(
              (cityData) =>
                cityData.admin_name.toLowerCase() ===
                selectedProvince.toLowerCase(),
            )
            .map((cityData) => cityData.city),
        );
    }
  }, [selectedProvince]);

  const itemsToMapOver =
    currentSelectingStep === "Province"
      ? provinces
      : currentSelectingStep === "City"
      ? cities
      : areas;

  const confirmArea =
    confirmSelectedProvince && confirmSelectedArea && confirmSelectedCity
      ? confirmSelectedProvince +
        "/" +
        confirmSelectedCity +
        "/" +
        confirmSelectedArea
      : "";

  return (
    <>
      <div className="flex flex-col gap-1">
        <p className="font-sans text-sm font-semibold text-themeSecondary">
          Area
        </p>

        <div className=" relative">
          <Input
            disabled
            placeholder="Select Your Area"
            className="disabled:cursor-pointer disabled:opacity-100"
            value={confirmArea}
          />
          <div
            onClick={onAreaSelectorClick}
            className="absolute inset-0 cursor-pointer bg-transparent"
          />
        </div>
      </div>

      <Drawer
        side="bottom"
        open={isOpen}
        setOpen={setIsOpen}
        className="h-[93%] bg-slate-100 pb-20 max-[420px]:px-2"
      >
        <SheetHeader>
          <SheetTitle>Select Your Area</SheetTitle>
        </SheetHeader>

        <div className=" mt-6 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            {selectingSteps.map((step, i) => {
              if (!(i <= currentSelectingStepIndex)) return null;

              const isBeingSelected = i === currentSelectingStepIndex;
              const hasBeenSelected = i < currentSelectingStepIndex;

              return (
                <div
                  key={i}
                  onClick={() => onStepClick(step as any)}
                  className="flex items-center justify-between rounded-md bg-white p-2"
                >
                  <div className="flex items-center gap-4">
                    {hasBeenSelected ? (
                      <FaCheckCircle className="h-4 w-4 text-blue-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full bg-blue-400" />
                    )}

                    <p
                      className={clsx(
                        "font-text text-sm font-semibold",
                        isBeingSelected
                          ? "text-themeBlue"
                          : "text-themeSecondary",
                      )}
                    >
                      {step}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <p className="font-sans text-sm text-black">
                      {i === 0
                        ? selectedProvince
                        : i === 1
                        ? selectedCity
                        : selectedArea}
                    </p>
                    <HiChevronRight className="h-4 w-4 text-slate-800" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-text text-sm text-slate-700">
              {"Select a " + currentSelectingStep}
            </p>

            <div className="h-56 overflow-y-auto rounded-md bg-white p-4">
              <div className="flex flex-col gap-1">
                {itemsToMapOver.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => onItemClick(item)}
                    className="flex cursor-pointer flex-col gap-1"
                  >
                    <p
                      className="line-clamp-1 text-base
                    text-black"
                    >
                      {item}
                    </p>

                    <Seperator />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-14 bg-white p-3">
            <Button
              Disabled={
                !selectedProvince.length ||
                !selectedCity.length ||
                !selectedArea.length
              }
              onClick={onConfirm}
              className="w-full"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};
