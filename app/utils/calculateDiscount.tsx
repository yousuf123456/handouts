import { Cart_FavouriteItemProductType, ProductInfo, fullCategoryDiscountedProductType } from "../types";

export const calculateDiscountOff = (product : fullCategoryDiscountedProductType | Cart_FavouriteItemProductType | ProductInfo | null | undefined) => {
    const onDiscount =  !!product?.discount;
    const todayDate = new Date();
    if (onDiscount) {
        // Uncomment it to make real
        // if (todayDate !> product?.discount?.startingDate! || todayDate !< product?.discount?.endingDate! ){
        //     if (product?.discount?.isPercentOff) return 1
        //     else 0
        // }

        if (product?.discount?.isPercentOff) {
            return product.discount.percentOff
        }

        return product.discount?.ammountOff
    }
}