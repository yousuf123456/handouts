"use client"
import * as React from "react"
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import clsx from "clsx";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SelectOptionsProps {
  onChange? : (e: any)=> void;
  defaultValue? : string;
  placeHolder? : string;
  isLoading? : boolean;
  required? : boolean;
  disabled? : boolean;
  options : string[];
  label : string;
  field? : any;
}
 
export const SelectOptions: React.FC<SelectOptionsProps> = ({
  label,
  placeHolder,
  defaultValue,
  onChange,
  options,
  disabled,
  required,
  isLoading,
  field
}) => {

  return (
    <Select 
      required={required} 
      disabled={disabled} 
      {...field} 
      onValueChange={(value)=> {
        field && field.onChange();
        onChange && onChange(value);
      }}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="w-full h-[38px] gap-2 bg-slate-100 outline-none placeholder:text-slate-500">
        <SelectValue onChange={()=> console.log("heloo")} placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent className={clsx("w-full z-[1000] max-h-72 overflow-y-auto", isLoading && "opacity-60")}>
        <SelectGroup>
          <SelectLabel>{ label }</SelectLabel>
          {
            options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}