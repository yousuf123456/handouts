
import { CartItemProductType, CartItemType, CombinationsType } from '@/app/types';
import { formatCartItems } from '@/app/utils/formatCartItems';
import React from 'react'
import { CheckoutItemCard } from './CheckoutItemCard';

interface CheckoutItemsListProps {
    products : CartItemType[] | CartItemProductType[];
    fromCart : boolean | undefined;
    quantity : number | undefined;
    combination : CombinationsType | null | undefined;
}

export const CheckoutItemsList: React.FC<CheckoutItemsListProps> = ({
    products,
    fromCart,
    quantity,
    combination
}) => {
    let productsToBeFormated;
    if(fromCart) productsToBeFormated = products
    else productsToBeFormated = [{
        quantity: quantity,
        selectedCombination: combination,
        id: "any",
        userId: "any",
        productId: "any",
        product : products[0]
    }]

    //@ts-ignore
    const formatedProducts = formatCartItems(productsToBeFormated);

  return (
    <div className='w-full flex flex-col gap-3'>
        {
            formatedProducts.map((formatedProduct, i)=> (
                <CheckoutItemCard
                    key={i}
                    checkoutItem={formatedProduct}
                    fromCart={fromCart} 
                />
            ))
        }
    </div>
  )
}
