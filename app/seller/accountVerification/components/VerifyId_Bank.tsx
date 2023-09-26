import { Button } from "@/components/ui/button";
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Upload } from "./Upload";
import { Input2 } from "@/app/components/Input2";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";

interface VerifyId_BankProps {
  goOnNextStep: () => void;
  goOnPrevStep: () => void;
  watch: UseFormWatch<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

export const VerifyId_Bank: React.FC<VerifyId_BankProps> = ({
  goOnPrevStep,
  goOnNextStep,
  register,
  watch,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Button className="gap-2" onClick={goOnPrevStep}>
        <HiChevronLeft className="h-5 w-5 text-white" />
        Back
      </Button>

      <div className="flex flex-col gap-4">
        <h3 className="text-base font-medium text-black">
          Verify Your Identity Card
        </h3>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-text text-xs font-semibold text-slate-600">
              Front Side of Id Card
            </p>
            <div className="w-full">
              <Upload label="Click To Upload" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-text text-xs font-semibold text-slate-600">
              Back Side of Id Card
            </p>
            <div className="w-full">
              <Upload label="Click To Upload" />
            </div>
          </div>
        </div>
      </div>

      <Input2
        type="text"
        watch={watch}
        id="idCardName"
        required={true}
        label="Name On Id Card"
        register={register}
        placeholder="Enter Name on Id Card"
      />

      <Input2
        type="text"
        watch={watch}
        id="idCardNumber"
        required={true}
        label="13 Digit Number On Id Card"
        register={register}
        placeholder="Enter Number on Id Card"
      />

      <h3 className="text-base font-medium text-black">
        Verify Your Bank Account
      </h3>

      <div className="flex flex-col gap-2">
        <p className="font-text text-xs font-semibold text-slate-600">
          Upload the Front Page for Bankbook/Bank Statement/Cheque Copy/Mobile
          Banking Screenshot
        </p>
        <div className="w-full">
          <Upload label="Click To Upload" />
        </div>
      </div>

      <Input2
        type="text"
        watch={watch}
        id="accountHolderName"
        required={true}
        label="Account Holder Name"
        register={register}
        placeholder="Enter Account Holder Name"
      />

      <Input2
        type="text"
        watch={watch}
        id="IBAN"
        required={true}
        label="Should be Alpha numeric, 24 digits field, start with PK"
        register={register}
        placeholder="IBAN (ex:AA00AAAA000000000)"
      />

      <Input2
        type="text"
        watch={watch}
        id="bankName"
        required={true}
        label="Bank Name"
        register={register}
        placeholder="Enter Bank Name"
      />

      <Input2
        type="text"
        watch={watch}
        id="bankCode"
        required={true}
        label="Bank Code"
        register={register}
        placeholder="Enter Bank Code"
      />

      <Input2
        type="text"
        watch={watch}
        id="branchName"
        required={true}
        label="Branch Name"
        register={register}
        placeholder="Enter Branch Name"
      />

      <Input2
        type="text"
        watch={watch}
        id="accountNumber"
        required={true}
        label="Account Number"
        register={register}
        placeholder="Enter Account Number"
      />

      <Button
        className="gap-2 bg-themeBlue hover:bg-blue-600"
        onClick={goOnNextStep}
      >
        Next
        <HiChevronRight className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
};
