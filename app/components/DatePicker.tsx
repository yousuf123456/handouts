"use client"
 
// import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dynamic from "next/dynamic"

const DynamicDatePicker = dynamic(() =>
  import('@mui/x-date-pickers/DatePicker').then((mod) => mod.DatePicker)
)

import * as React from "react"

interface DatePickerProps {
  isLoading? : boolean;
  disabled? : boolean;
  label : string;
  field : any;
}
 
export function DateChooser({ isLoading, disabled, label, field } : DatePickerProps) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DynamicDatePicker 
        {...field}
        sx={{ mt : 1, width : 160 }} 
        disabled={disabled} 
        label={label} 
        slotProps={{ textField : { size : "small" } }}
      />
    </LocalizationProvider>
  )
}