import { CartItemProductType, Cart_FavouriteItemProductType, ProductInfo } from "../types"
import { calculateDiscountOff } from "./calculateDiscount"

export const getPriceInfo = (
    product : ProductInfo | Cart_FavouriteItemProductType | CartItemProductType | undefined
) => {
    const productOnSale = ()=>{
        return !!(product?.discount)
    }

    let discountOff = (): number | null | undefined=>{
        if (product?.discount) {
            return calculateDiscountOff(product)
        }

        return null
    }

    const isPercentOff = !!product?.discount?.isPercentOff;
    const discountOffLabel = isPercentOff ? "-" + discountOff() + "% off" : "-" + discountOff() + " Rs off";

    return {
        productOnSale : productOnSale,
        discountOff : discountOff,
        isPercentOff : isPercentOff,
        discountOffLabel : discountOffLabel
    }
}