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
      onValueChange={(e)=> {
        field && field.onChange();
        onChange && onChange(e);
      }}
    >
      <SelectTrigger className="w-full h-[38px] bg-slate-100 outline-none placeholder:text-slate-500">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent className={clsx("w-full z-[1000] max-h-72 overflow-y-auto", isLoading && "opacity-60")}>
        <SelectGroup>
          <SelectLabel>{ label }</SelectLabel>

          {
            options.map((option) => (
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