import { Input } from "@/components/ui/input";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  placeHolder: string;
  register: UseFormRegister<FieldValues>;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  required,
  disabled,
  register,
  placeHolder,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-sans text-sm font-semibold text-themeSecondary">
        {label}
      </p>
      <Input
        {...register(id, { required })}
        disabled={disabled}
        placeholder={placeHolder}
      />
    </div>
  );
};
