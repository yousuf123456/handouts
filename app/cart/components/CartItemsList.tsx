import { CartItemType } from '@/app/types'
import React from 'react'
import { Cart_FavouriteItemCard } from '../../components/Cart_FavouriteItem'
import { ReduxProvider } from '@/app/context/ReduxProvider'

interface CartItemsListProps {
  cartItems : CartItemType[]
}

export const CartItemsList: React.FC<CartItemsListProps> = ({
  cartItems
}) => {
  return (
    <ReduxProvider>
      <div className='w-full flex flex-col gap-0'>
        {
          cartItems.map((cartItem, i) => (
            <Cart_FavouriteItemCard 
              key={i} 
              cartItem={cartItem} 
            />
          ))
        }
      </div>
    </ReduxProvider>
  )
}
