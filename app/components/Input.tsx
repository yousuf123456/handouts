import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { cn } from '../utils/cn';

const InputProps = cva(
    `w-full
    py-1
    md:py-1.5
    lg:px-3
    px-2
    h-9
    ring-0
    ring-blue-500
    ring-inset
    text-[14px]
    rounded-none
    font-medium
    font-text
    focus-visible:outline-none
    placeholder:text-slate-400
    placeholder:text-sm
    placeholder:font-text
    placeholder:font-medium 
    leading-6`,

    {
        variants : {
            isLoading : {
                true : "border-neutral-400 text-neutral-400",
                false : "border-blue-600 text-black"
            }
        }
    }
)

interface InputProps {
    id : string;
    type : string;
    placeholder : string;
    required : boolean;
    isLoading? : boolean;
    autoComplete? : string;
    className? : string;
    onFocus? : ()=>void;
    onBlur? : ()=>void;
    register : UseFormRegister<FieldValues>;
} 

export const Input: React.FC<InputProps> = ({ 
    id,
    isLoading,
    required,
    className,
    autoComplete,
    onFocus,
    onBlur,
    register,
    ...props
 }) => {
  return (
    <input
        id='searchBar'
        {...register(id, {
            required
        })}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={isLoading}
        autoComplete={autoComplete}
        className={cn(InputProps({ isLoading, className }))}
        {...props}
    />
  )
}
