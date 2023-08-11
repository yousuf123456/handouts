import { CombinationsType, VariantsType } from '@/app/types'
import clsx from 'clsx';
import React from 'react'

import Image from "next/image"
import { TooltipWrapper } from '@/app/components/TooltipWrapper';

interface ProductVariantsProps {
    variants : VariantsType | undefined;
    selectedCombination : CombinationsType | undefined;
    changeCombination : (variant: string, value: string) => void;
    setSelectedVariantPicture : React.Dispatch<React.SetStateAction<string>>
}

export const ProductVariants: React.FC<ProductVariantsProps> = ({
    variants,
    selectedCombination,
    changeCombination,
    setSelectedVariantPicture
}) => {
  return (
    <>
    {
        variants && (
            <div className='mt-6 flex flex-col gap-3'>
                {
                    Object.keys(variants).map((key1, i) => (
                        <div key={i} className='flex gap-2 items-center'>
                            <h3 className='min-w-[80px] text-sm font-text'>
                                { variants[key1].title + " :" }
                            </h3>
                            <div className='flex gap-2 items-end'>
                            {
                                Object.keys(variants[key1]).map((key2, i2) => {
                                    if(key2 === "title"){
                                        return null
                                    }

                                    const isSelectedVariant = selectedCombination?.combination[key1] === variants[key1][key2].title
                                    return (
                                        <div key={i2} className='flex flex-col gap-1'>
                                            {
                                                variants[key1][key2].images.length === 0 ? (
                                                    <p
                                                        className={clsx('px-1 font-semibold font-text text-slate-700 uppercase cursor-pointer transition-all tracking-wider hover:bg-themeBlue hover:text-white', isSelectedVariant && "bg-themeBlue text-white")}
                                                        onClick={()=>changeCombination(key1, variants[key1][key2].title)}
                                                    >
                                                        { variants[key1][key2].title }
                                                    </p>
                                                )
                                                : (
                                                    <>
                                                    {
                                                        i2 === 1 && (
                                                            <p className={clsx('text-sm uppercase font-text font-semibold text-slate-700')}>
                                                                { selectedCombination?.combination.color }
                                                            </p>
                                                        )
                                                    }
                                                    
                                                    {
                                                        <TooltipWrapper arrow={false} color='pink' textColor='black' content={variants[key1][key2].title}>
                                                            <div 
                                                                className={clsx('relative w-9 h-9 cursor-pointer peer', isSelectedVariant && " border-2 border-rose-500")}
                                                                onClick={()=>{
                                                                    changeCombination(key1, variants[key1][key2].title);
                                                                    setSelectedVariantPicture(variants[key1][key2].images[0])
                                                                }}
                                                            >
                                                                <Image 
                                                                    src={variants[key1][key2].images[0]}
                                                                    alt="Image"
                                                                    fill
                                                                />
                                                                
                                                            </div>
                                                        </TooltipWrapper>
                                                    }
                                                    
                                                    </>
                                                ) 
                                            }
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
    </>
  )
}
