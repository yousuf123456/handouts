import { getCurrentUser } from "./getCurrentUser";
import prisma from "../libs/prismadb";

export const getProductBeingShipped = async (
  fromCart: boolean,
  productId?: string,
) => {
  if (fromCart) {
    return null;
  }

  const pendingShippedProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },

    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      storeId: true,
      category: true,
      discount: true,
      storeName: true,
      combinations: true,
      superTokensUserId: true,
    },
  });

  if (!pendingShippedProduct) return null;

  return [pendingShippedProduct];
};
