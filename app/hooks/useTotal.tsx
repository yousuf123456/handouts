import { CartItemProductType, CartItemType, CombinationsType, FormatedCartItemType } from "../types";
import { priceLabel } from "../utils/priceLabel";
import { getPriceInfo } from "../utils/getPriceInfo";
import { Prisma } from "@prisma/client";

type ItemsType = {
    id? : string;
    userId? : string;
    productId? : string
    quantity: number;
    selectedCombination: CombinationsType | null | Prisma.JsonValue;
    product : CartItemProductType
}[];

export function useTotal(items : ItemsType) {
    let subTotal = 0
    let productsAmmount = 0 

    items.forEach((item) => {
        const selectedCombination = item?.selectedCombination as CombinationsType
        const {
            productOnSale,
            discountOff,
            isPercentOff

        } = getPriceInfo(item.product)

        productsAmmount += item.quantity

        if(selectedCombination) {
            const price = priceLabel(productOnSale(), isPercentOff, discountOff(), selectedCombination.price) * item.quantity
            subTotal += price
        }

        else {
            const price = priceLabel(productOnSale(), isPercentOff, discountOff(), item.product.price) * item.quantity
            subTotal += price
        }
    });

    return {
        subTotal: subTotal, 
        productsAmmount : productsAmmount
    }
}