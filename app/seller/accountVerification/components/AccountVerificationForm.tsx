"use client";
import React, { useState } from "react";
import { CurrentFormProgress } from "./CurrentFormProgress";
import { SellerAccountVerificationStepsType } from "@/app/types";
import { Seperator } from "@/app/components/Seperator";
import { AddProfile } from "./AddProfile";
import { FieldValues, useForm } from "react-hook-form";
import { sellerAccountVerificationSteps } from "@/app/constants/seller";
import { AddAddress } from "./AddAddress";
import { VerifyId_Bank } from "./VerifyId_Bank";

export const AccountVerificationForm = () => {
  const [currentStep, setCurrentStep] =
    useState<SellerAccountVerificationStepsType>("Add Profile");

  const labels = {
    "Add Profile": "First we have to get to know more about you",
    "Add Address": "Enter your address details",
    "Verify Id & Bank":
      "Let us know about your bank information, don’t worry we’ll keep this information confidential",
  };

  const { register, watch, control } = useForm<FieldValues>({
    defaultValues: {
      storeName: "",
      email: "",
      phone: "",
      province: undefined,
      city: undefined,
      area: undefined,
      detailedAddress: "",
      idCardName: "",
      idCardNumber: "",
      accountHolderName: "",
      IBAN: "",
      bankName: "",
      bankCode: "",
      branchName: "",
      accountNumber: "",
    },
  });

  const goOnNextStep = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setCurrentStep(
      //@ts-ignore
      sellerAccountVerificationSteps[
        sellerAccountVerificationSteps.indexOf(currentStep) + 1
      ],
    );
  };

  const goOnPrevStep = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setCurrentStep(
      //@ts-ignore
      sellerAccountVerificationSteps[
        sellerAccountVerificationSteps.indexOf(currentStep) - 1
      ],
    );
  };

  return (
    <div className="flex flex-col gap-12">
      {
        <CurrentFormProgress
          currentStep={currentStep}
          //@ts-ignore
          label={labels[currentStep]}
        />
      }

      <div className="px-96 pb-28">
        {currentStep === "Add Profile" && (
          <AddProfile
            goOnNextStep={goOnNextStep}
            watch={watch}
            register={register}
          />
        )}

        {currentStep === "Add Address" && (
          <AddAddress
            watch={watch}
            control={control}
            register={register}
            goOnNextStep={goOnNextStep}
            goOnPrevStep={goOnPrevStep}
          />
        )}

        {currentStep === "Verify Id & Bank" && (
          <VerifyId_Bank
            goOnNextStep={goOnNextStep}
            goOnPrevStep={goOnPrevStep}
            register={register}
            watch={watch}
          />
        )}
      </div>
    </div>
  );
};
