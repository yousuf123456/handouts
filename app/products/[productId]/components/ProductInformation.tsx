"use client"
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import React, { useEffect, useState } from 'react'
import Image from "next/image"

import { AverageStats } from './AverageStats'
import { getAverageRating } from '@/app/utils/getAverageRating'
import { RatingStars } from '@/app/components/RatingStars'
import { Carousel } from 'react-responsive-carousel'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { CombinationsType, ProductInfo, VariantsType } from '@/app/types'
import { Avatar } from '@/app/components/Avatar'
import {format} from "date-fns"
import { CtaLink } from '@/app/(site)/components/CtaLink'
import { ProductVariants } from './ProductVariants'
import { ProductCTAs } from './ProductCTAs'
import { useAppDispatch } from '@/app/store/store'
import { setAvgRating, setDetailedRatingsCount, setQuestionsCount, setRatingsCount } from '@/app/store/features/productMinorInfoSlice'

import find from "lodash/find"
import clsx from 'clsx'
import { ProductPrice } from '@/app/components/ProductPrice'
import { Quantity } from '@/app/components/Quantity'
import { getPriceInfo } from '@/app/utils/getPriceInfo'
import { ProductSideInfo } from './productSideInfo/ProductSideInfo'

interface ProductInformationProps {
    product : ProductInfo
}

export const ProductInformation: React.FC<ProductInformationProps> = ({
    product
}) => {

    const [quantity, setQuantity] = useState(1);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedPicture, setSelectedPicture] = useState("");
    const [selectedVariantPicture, setSelectedVariantPicture] = useState("");

    const dispatch = useAppDispatch();

    useEffect(()=>{
        if(product?.avgRating !== undefined && product?.ratingsCount !== undefined && product?.questionsCount !== undefined) {
            dispatch(setAvgRating(product.avgRating))
            dispatch(setRatingsCount(product.ratingsCount))
            dispatch(setQuestionsCount(product.questionsCount))
            //@ts-ignore
            dispatch(setDetailedRatingsCount(product.detailedRatingsCount))
        }

    }, [product?.ratingsCount, product?.questionsCount, dispatch])

    const {
        productOnSale,
        discountOff,
        isPercentOff,
        discountOffLabel
    } 
    = getPriceInfo(product!);

    // Make it real
    const fakeDetailedImages = [
        "/images/exclusiveSection/frames.jpg",
        "/images/exclusiveSection/cosmicPlayland.jpg",
        "/images/exclusiveSection/handmade.jpg",
        "/images/exclusiveSection/luxury_decor.jpg",
    ]

    const displayCount = 3
    const chevronsClassName = "w-8 h-8 text-slate-600 cursor-pointer"

    const moveToTheNextImage = ()=>{
        if (selectedIndex < fakeDetailedImages.length - 1) {
            setSelectedIndex((prev)=> prev + 1)
        }
    }

    const moveToThePreviousImage = ()=>{
        if (selectedIndex > 0) {
            setSelectedIndex((prev)=> prev - 1)
        }
    }

    useEffect(()=>{
        // Make it real
        setSelectedPicture(fakeDetailedImages[selectedIndex]);
        setSelectedVariantPicture("");
    }, [selectedIndex])

    const variants  = product?.variants as VariantsType | undefined;
    const productCombinations = product?.combinations as CombinationsType[] | undefined
    const defaultProductCombination = productCombinations?.filter((combination) => combination.default)[0]
    const [selectedCombination, setSelectedCombination] = useState(defaultProductCombination)
    
    const changeCombination = (variant : string, value : string)=>{
        setSelectedCombination((prev) => {
            const combination = {...prev!.combination, [variant] : value}
            const Combination = find(productCombinations, {combination});
            return Combination
        })
    }

  return (
    <div className='flex gap-0'>
        <div className='flex flex-col gap-2 items-start'>
            <div className='relative w-80 h-80 overflow-hidden rounded-sm'>
                <Image
                    src={(variants && selectedVariantPicture) || selectedPicture || product?.image || ""}
                    alt='Product Picture'
                    className='object-cover'
                    fill
                />
            </div>

            {/* Have to make it real */}
            {
                fakeDetailedImages?.length !== 0 && (
                <div className='w-80 flex gap-0 items-center justify-center'>
                        <HiChevronLeft onClick={moveToThePreviousImage} className={chevronsClassName} />
                        <Carousel
                            centerMode
                            centerSlidePercentage={100 / displayCount}
                            selectedItem={selectedIndex}
                            showIndicators={false}
                            showStatus={false}
                            showThumbs={false}
                            showArrows={false}
                        >                           
                            {                                   
                            fakeDetailedImages.map((image:string, i) => (
                                <div onClick={()=>{
                                    if(selectedIndex !== i){
                                        setSelectedIndex(i);
                                    }
                                    else{
                                        setSelectedPicture(image);
                                        setSelectedVariantPicture("");
                                    }
                                }} key={i} className={clsx('relative w-16 h-16 flex-shrink-0 cursor-pointer', i === selectedIndex && "border-2 border-slate-500")}>
                                    <Image 
                                        src={image}
                                        alt='Image'
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                            ))
                            }
                            
                        </Carousel>
                        <HiChevronRight onClick={moveToTheNextImage} className={clsx(chevronsClassName, "relative -left-5")} />
                    </div>
                )
            }
        </div>

        <div className='ml-6 px-6 w-full flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-xl font-heading font-extrabold text-themeSecondary'>
                    { product?.name }
                </h1>
                <div className='flex flex-col gap-0'>
                    <div className='flex gap-2 items-center'>
                        <RatingStars defaultValue={product?.avgRating!} />
                        <p className='text-sm font-text'> {product?.avgRating! + "/5"}</p>
                    </div>

                    <div className='mt-1'>
                        <AverageStats label='Ratings' averageStats={product?.ratingsCount} href="user" />
                    </div>
                </div>
            </div>

            <ProductPrice 
                discountOff={discountOff}
                productOnSale={productOnSale}
                isPercentOff={isPercentOff}
                discountOffLabel={discountOffLabel}
                price={variants ? selectedCombination?.price : product?.price}
            />
            
            <ProductVariants 
                variants={variants}
                selectedCombination={selectedCombination}
                changeCombination={changeCombination}
                setSelectedVariantPicture={setSelectedVariantPicture}
            />

            <div className='mt-0 flex gap-2'>
            <h3 className='min-w-[80px] font-text text-sm'>Quantity :</h3>
                <Quantity 
                    quantity={quantity}
                    setQuantity={setQuantity}
                />
            </div>


            <div className='h-full flex items-end gap-4'>
                <ProductCTAs 
                    selectedCombination={selectedCombination}
                    quantity={quantity}
                    productId={product?.id}
                    stock={variants ? selectedCombination?.stock : product?.quantity}
                />
            </div>
        </div>

        <ProductSideInfo
            product={product}
        />
    </div>
  )
}
