import prisma from "../../libs/prismadb";

export const getStoreProducts = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  const productsFromSameStore = await prisma.product.findMany({
    where: {
      storeId: product?.storeId,
      NOT: { id: product?.id },
    },

    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      storeId: true,
      avgRating: true,
      keywords: true,
      attributes: true,
      promoPrice: true,
      ratingsCount: true,
      categoryTreeData: true,
      superTokensUserId: true,
      promoPriceEndingDate: true,
      promoPriceStartingDate: true,
    },

    take: 4,
  });

  return productsFromSameStore;
};
