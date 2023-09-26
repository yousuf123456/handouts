import { Input2 } from "@/app/components/Input2";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React from "react";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import { HiChevronRight } from "react-icons/hi";

interface AddProfileProps {
  watch: UseFormWatch<FieldValues>;
  register: UseFormRegister<FieldValues>;
  goOnNextStep: () => void;
}

export const AddProfile: React.FC<AddProfileProps> = ({
  watch,
  register,
  goOnNextStep,
}) => {
  const session = useSession();

  return (
    <div className="flex w-full flex-col gap-8">
      <Input2
        type="text"
        watch={watch}
        id="storeName"
        required={true}
        label="Store Name"
        register={register}
        placeholder="Enter Store Name"
      />

      <Input2
        id="email"
        type="text"
        watch={watch}
        required={true}
        label="Email"
        register={register}
        placeholder="Enter Your Email"
        defaultValue={session.data?.user?.email}
      />

      <Input2
        type="text"
        watch={watch}
        id="phone"
        required={true}
        label="Mobile Number"
        register={register}
        placeholder="Enter Mobile Number"
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
