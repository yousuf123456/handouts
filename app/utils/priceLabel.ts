

export const priceLabel = (

    productOnSale : boolean,
    isPercentOff : boolean | null | undefined, 
    discountOff : number | null | undefined, 
    price : number | undefined
    
    )=> {
        if (productOnSale){
            if (isPercentOff) {
                return (price! * ((100 - discountOff!) / 100))
            }
            return (price! - discountOff!)
        }

        else {
            return price!
        }
}