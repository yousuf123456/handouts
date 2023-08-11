import { Prisma } from "@prisma/client";
import { CartItemProductType, CombinationsType } from "../types";
import { getPriceInfo } from "./getPriceInfo";
import { priceLabel } from "./priceLabel";


type ItemType = {
    id? : string;
    userId? : string;
    productId? : string
    quantity: number;
    selectedCombination: CombinationsType | null | Prisma.JsonValue;
    product : CartItemProductType
}

export const getProductPrice = (product: ItemType)=> {
    const selectedCombination = product?.selectedCombination as CombinationsType
    const {
        productOnSale,
        discountOff,
        isPercentOff

    } = getPriceInfo(product.product)

    if(selectedCombination) {
        const price = priceLabel(productOnSale(), isPercentOff, discountOff(), selectedCombination.price) * product.quantity
        return price
    }

    else {
        const price = priceLabel(productOnSale(), isPercentOff, discountOff(), product.product.price) * product.quantity
        return price
    }
}