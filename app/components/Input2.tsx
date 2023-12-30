import clsx from "clsx";
import React, { ReactNode, useEffect } from "react";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface Input2Props {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  isLoading?: boolean;
  disabled?: boolean;
  required: boolean;
  icon?: ReactNode;
  isRequirementsMatched?: boolean;
  defaultValue?: string | undefined | null;
  onFocus?: () => void;
  onBlur?: () => void;
  setValue?: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

export const input2Styling = `
    transition-all
    rounded-[2px]
    w-full 
    py-2
    px-3
    font-text
    text-sm
    text-black
    placeholder:text-sm 
    placeholder:flex
    placeholder:h-full
    placeholder:items-center
    placeholder:text-slate-400
    focus-visible:bg-white
    focus-visible:outline-none
    focus-visible:inset
`;

export const Input2: React.FC<Input2Props> = ({
  id,
  type,
  label,
  placeholder,
  isLoading,
  disabled,
  required,
  icon,
  defaultValue,
  isRequirementsMatched,
  onFocus,
  setValue,
  onBlur,
  watch,
  register,
}) => {
  const fieldValue = watch(id);

  useEffect(() => {
    if (defaultValue && setValue) {
      setValue(id, defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className="flex w-full flex-col items-start gap-1">
      <p className="font-text text-xs font-semibold text-slate-600">{label}</p>

      <div className="relative w-full">
        {icon ? icon : ""}
        <input
          {...register(id, {
            required,
          })}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          className={clsx(
            input2Styling,
            fieldValue.length
              ? "bg-white ring-2 ring-green-400"
              : "bg-slate-100 focus-visible:ring-2 focus-visible:ring-green-400",
            isRequirementsMatched === false &&
              fieldValue.length &&
              "ring-2 ring-red-500",
            isLoading || disabled ? "ring-opacity-30" : "",
          )}
        />
      </div>
    </div>
  );
};
