import React from 'react'
import { Button } from './Button'
import clsx from 'clsx';
import { cn } from '../utils/cn';

interface QuantityProps{
    quantity : number;
    isCartItem? : boolean;
    setQuantity? : React.Dispatch<React.SetStateAction<number>>;
    onIncrease? : ( didDecrement : boolean )=>void 
    onDecrease? : ( didDecrement : boolean )=>void 
}

export const Quantity: React.FC<QuantityProps> = ({
    quantity,
    isCartItem,
    setQuantity,
    onIncrease,
    onDecrease
}) => {
    const quantityButtonsCs = cn("flex justify-center items-center w-5 h-5 p-[2px] sm:w-6 sm:h-6 sm:p-1 font-text text-xs sm:text-base font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-[3px]")

    const onQuantityIncrease = ()=>{
        if (setQuantity) {
            setQuantity((prev)=>prev+1)
        }
    }

    const onQuantityDecrease = ()=>{
        if (setQuantity) {
            setQuantity((prev)=>prev > 1 ? prev - 1 : 1)
        }
    }

  return (
    <div className='flex gap-1'>
        <Button disabled={ quantity === 1 } className={cn(quantityButtonsCs, quantity === 1 && "opacity-50 hover:bg-slate-200 cursor-not-allowed")} onClick={()=>{
            if(isCartItem && onDecrease) {
                onDecrease(true);
            }
            else onQuantityDecrease()
        }}>
            -
        </Button>

        <div className='rounded-[3px] flex justify-center items-center h-5 w-5 sm:w-9 sm:h-6 bg-white sm:bg-slate-200'>
            <p className='text-sm sm:text-base text-black font-text font-extrabold'>{quantity}</p>
        </div>

        <Button className={quantityButtonsCs} onClick={()=>{
            if(isCartItem && onIncrease) {
                onIncrease(false) 
            }
            else onQuantityIncrease()
        }}>
            +
        </Button>
    </div>
  )
}
