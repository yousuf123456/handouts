"use client";

import { Cart_FavouriteItemCard } from '@/app/components/Cart_FavouriteItem';
import { EmptyStatus } from '@/app/components/EmptyStatus';
import { SpinnerLoader } from '@/app/components/SpinnerLoader';
import { setFavouriteItems, setHasBeenFetched } from '@/app/store/features/favouritesSlice';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export const FavouritesItems = () => {
  const [isLoading, setIsLoading] = useState(false);
  const hasBeenFetched = useAppSelector(state => state.favourites.hasBeenFetched) 
  const dispatch = useAppDispatch();

  const session = useSession();
  
  useEffect(()=>{
    if(!hasBeenFetched) {
    setIsLoading(true);
      axios.post("../../api/getFavourites")
      .then((res) => {
        dispatch(setFavouriteItems(res.data.favouriteItems));
        dispatch(setHasBeenFetched(true));
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(()=> setIsLoading(false))
    }

  }, [hasBeenFetched])

  const favouriteItems = useAppSelector(state => state.favourites.favouritesItems);
  useEffect(()=> {console.log(favouriteItems)}, [favouriteItems])

  if(!isLoading && session.status !== "loading" && favouriteItems.length === 0){
    return (
      <EmptyStatus 
        label='There are no favourites yet!'
      />
    )
  }

  return (
    <>
    {
      (isLoading || session.status === "loading") ? (
        <SpinnerLoader />
      ): (
        <div className='w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 py-4'>
          <div className='w-full flex flex-col gap-2 sm:gap-6'>
            <h2 className='hidden sm:block sm:text-xl font-text font-semibold text-themeSecondary'>
              Favourites
            </h2>
    
            <div className='w-full flex flex-col gap-0'>
              {
                favouriteItems.map((favouriteItem, i) => (
                  <Cart_FavouriteItemCard 
                    key={i}
                    isFavouriteItem={true}
                    favouriteItem={favouriteItem}
                  />
                ))
              }
            </div>
          </div>
        </div>
      )
    }
    </>
  )
}
