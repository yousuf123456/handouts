import { getCurrentUser } from "./getCurrentUser"
import prisma from "../libs/prismadb"


export const getProductBeingShipped = async(fromCart : boolean, productId? : string)=> {
    if(fromCart) {
        return null;
    }

    const pendingShippedProduct = await prisma.product.findUnique({
        where : {
            id : productId
        },

        select : {
            id: true,
            name: true,
            image: true,
            storeName : true,
            storeId : true,
            price: true,
            combinations : true,
            discount: true
        }
    });

    if(!pendingShippedProduct) return null

    return [pendingShippedProduct]
}