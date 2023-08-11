import { Category, Product } from "@prisma/client";
import prisma from "../libs/prismadb"

export const getDiscountedProducts = async(byCategory : boolean) => {

    if (byCategory) {
      const productsWithDiscounts = await prisma.product.findMany({
        take : 10, 
        where : {
          OR : [
            {
              store : {
                discounts : {
                  some : {
                    isApplicableForStore : true
                  }
                }
              },
            },

            {
              NOT : {discount : null}
            }
          ]
        },

        include : {
          discount : true
        }
      }); 

      if (productsWithDiscounts) {
        return productsWithDiscounts;
      }
      return []
    }

    else {
      return []
    }
}