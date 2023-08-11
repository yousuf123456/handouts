"use client"
import { Button } from '@/app/components/Button'
import { CombinationsType } from '@/app/types'
import axios from 'axios'
import React, { useState } from 'react'
import { ActionsConfirmation } from './ActionsConfirmation'
import { useAppDispatch } from '@/app/store/store'
import { addCartItem, incrementCartItemsCount } from '@/app/store/features/cartSlice'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Heart } from 'lucide-react'
import { TooltipWrapper } from '@/app/components/TooltipWrapper'
import { addFavouriteItem } from '@/app/store/features/favouritesSlice'

interface ProductCTAsProps {
  selectedCombination : CombinationsType | undefined,
  quantity : number,
  productId : string | undefined,
  stock : number | undefined
}

export const ProductCTAs: React.FC<ProductCTAsProps> = ({
  stock,
  selectedCombination,
  quantity,
  productId
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);

  const [buttonLabel, setButtonLabel] = useState("");
  const [label, setLabel] = useState("");
  const [href, setHref] = useState("");

  const dispatch = useAppDispatch();
  const session = useSession();
  const router = useRouter();

  const onFavouritesAdd = ()=>{
    setIsLoading(true);
    setButtonLabel("");
    setOpen(true);

    axios.post("../../api/addToFavourites", {
      productId : productId
    })
    .then((res) => {
      setIsError(false)
      setLabel("Product added to your favourites")
      setButtonLabel("Open Favourites")
      setHref("/favourites")

      if(res.data !== true){
        dispatch(addFavouriteItem(res.data))
      }
    })
    .catch((e) => {
      setIsError(true)
      setLabel("Something went wrong!");
      console.log(e)
    })
    .finally(()=> setIsLoading(false))
  }

  const onAddToCart = ()=>{
    if (session.status === "loading") return 
    
    if(session.status === "unauthenticated"){
      return router.push(`/user/sign?callbackUrl=/products/${productId}`)
    }

    setIsLoading(true);
    setButtonLabel("");
    setOpen(true);
    axios.post("../../../api/addToCart", {
      selectedCombination,
      quantity,
      productId
    })
    .then((res) => {
      setIsError(false);
      setLabel("Product added to your cart");
      setButtonLabel("Open Cart")
      setHref("/cart")
      dispatch(addCartItem(res.data))
      dispatch(incrementCartItemsCount(quantity));
    })
    .catch((e)=>{
      setIsError(true)
      setLabel("Something went wrong!")
      console.log(e)
    })
    .finally(()=>setIsLoading(false));
  }

  const onClick = ()=> {
    router.push(`/shipping?fromCart=false&productId=${productId}&quantity=${quantity.toString()}&combination=${JSON.stringify(selectedCombination)}`)
  }

  return (
    <>
    {
      stock ? (
        <>
          <Button 
            variant={"outline"} 
            onClick={onAddToCart}
            className='
              border-rose-500 
              text-rose-500 
              hover:bg-rose-500 
              flex items-center 
              justify-center 
              w-36 
              h-9 
              font-semibold 
              text-sm'
          >
            Add to Cart
          </Button>

          <Button 
            variant={"default"} 
            onClick={onClick}
            className='
              bg-rose-500 
              hover:bg-rose-600 
              w-36
              h-9 
              font-medium 
              tracking-wider 
              text-sm'
          >
              Buy Now
          </Button>

          <TooltipWrapper content='Add to Favourites'>
            <Heart onClick={onFavouritesAdd} className='w-9 h-9 text-themeSecondary cursor-pointer'/>
          </TooltipWrapper>
        </>
      ) : (
        <div className='flex items-center gap-3'>
          <p className='text-xl font-text font-semibold tracking-wider text-red-500'>
            Out of Stock!
          </p>
          <Button 
            variant={"default"} 
            onClick={onFavouritesAdd}
            className='
            bg-rose-500
            hover:bg-rose-600
            flex 
            items-center 
            justify-center 
            w-48 
            h-10
            font-semibold 
            text-sm'
          >
            Add To Favourites
          </Button>
        </div>
      )
    }

    <ActionsConfirmation 
      open={open}
      setOpen={setOpen}
      isLoading={isLoading}
      label={label}
      buttonLabel={buttonLabel}
      href={href}
      isError={isError}
    />
    </>
  )
}
