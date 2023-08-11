"use client"

import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

interface ProgressIndicator {
    label : string;
    isLast : boolean;
    isDone : boolean;
    approved? : boolean;
    rejected? : boolean;
    currentStatus? : String;
    isOrderRequest? : boolean;
    currentlyBeingDone : boolean;
    orderRequestType? : "Cancellation" | "Return";
    statusesAfterApprovedOrRejectedStatus? : boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicator> = ({
    label,
    isDone,
    isLast,
    rejected,
    approved,
    isOrderRequest,
    orderRequestType,
    currentlyBeingDone,
    statusesAfterApprovedOrRejectedStatus
}) => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const animationDuration = 1500;
        const intervalDuration = 3000;

        const interval = setInterval(() => {
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, animationDuration);
        }, intervalDuration);

        return () => clearInterval(interval);
    }, []);
 
    const isRejectedOrApprovedStatus = label === "Approved / Rejected" 
  return (
    <div className='flex gap-0 items-center'>
        <div 
            className={
                twMerge(clsx(
                    'relative w-6 h-6 flex justify-center items-center rounded-full bg-blue-200',
                    isDone && (rejected && (isRejectedOrApprovedStatus || statusesAfterApprovedOrRejectedStatus) ? "bg-red-500" : "bg-blue-500"),
                    rejected && statusesAfterApprovedOrRejectedStatus && "bg-opacity-50"
                ))
            }
        >
            {isDone && (rejected && (isRejectedOrApprovedStatus || statusesAfterApprovedOrRejectedStatus) ? <FaTimes className={clsx('w-5 h-5 text-white')}/> : <FaCheckCircle className={clsx('w-5 h-5 text-white')}/>)}

            {currentlyBeingDone && !rejected && <div className={clsx('rounded-full transition-all duration-1000 bg-blue-500', isVisible ? "w-6 h-6 opacity-100" : "w-0 h-0 opacity-100")}/>}

            <p className='absolute w-64 -bottom-6 flex justify-center text-sm font-text text-black'>
                { label === "Approved / Rejected" && isDone ? (approved ? "Approved" : "Rejected")  : label }
            </p>
        </div>

        { 
            !isLast && <div className={
                twMerge(clsx(
                    'h-1 bg-blue-200',
                    isDone && (rejected && (isRejectedOrApprovedStatus || statusesAfterApprovedOrRejectedStatus) ? "bg-red-500" : "bg-blue-500"),
                    (rejected && (isRejectedOrApprovedStatus || statusesAfterApprovedOrRejectedStatus)) && "bg-opacity-50",
                    isOrderRequest && orderRequestType === "Cancellation" ? "w-80" : "w-40"
                ))}
            />
        }
    </div>
  )
}
