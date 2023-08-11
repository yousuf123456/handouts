import React from 'react'
import { Button } from './Button'
import clsx from 'clsx';

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
    const quantityButtonsCs = "flex justify-center items-center w-6 h-6 p-1 font-text text-base font-semibold bg-slate-200 text-slate-600 hover:bg-slate-300 rounded-[3px]"

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
        <Button disabled={ quantity === 1 } className={clsx(quantityButtonsCs, quantity === 1 && "opacity-50 hover:bg-slate-200 cursor-not-allowed")} onClick={()=>{
            if(isCartItem && onDecrease) {
                onDecrease(true);
            }
            else onQuantityDecrease()
        }}>
            -
        </Button>
        <div className='rounded-[3px] flex justify-center items-center w-9 h-6 bg-slate-200'>
            <p className='text-black font-text font-extrabold'>{quantity}</p>
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
