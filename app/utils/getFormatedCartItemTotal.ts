import { CartItemType, CombinationsType, FormatedCartItemType } from "../types";
import { getPriceInfo } from "./getPriceInfo";
import { priceLabel } from "./priceLabel";


export const getFormatedCartItemTotal = (formatedCartItemType: FormatedCartItemType)=> {
    let total = 0

    formatedCartItemType.cartItems.forEach((cartItem)=> {
        const selectedCombination = cartItem.selectedCombination as CombinationsType

        const {
            productOnSale,
            discountOff,
            isPercentOff

        } = getPriceInfo(cartItem.product)

        if(selectedCombination) {
            const price = priceLabel(productOnSale(), isPercentOff, discountOff(), selectedCombination.price) * cartItem.quantity
            total += price
        }

        else {
            const price = priceLabel(productOnSale(), isPercentOff, discountOff(), cartItem.product.price) * cartItem.quantity
            total += price
        }
    });

    return Math.round(total)
}