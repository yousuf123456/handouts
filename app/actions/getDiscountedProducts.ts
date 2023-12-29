import prisma from "../libs/prismadb";

export const getDiscountedProducts = async (byCategory: boolean) => {
  const products = await prisma.product.findMany({
    take: 10,
  });

  return products;
};
