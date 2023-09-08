import prisma from "../libs/prismadb";

export const heavyAction = async () => {
  await prisma.product.findMany();
  await prisma.product.findMany();
  await prisma.product.findMany();
  await prisma.product.findMany();
  await prisma.product.findMany();
  await prisma.order.findMany();
  await prisma.order.findMany();
  await prisma.order.findMany();
  await prisma.order.findMany();
  await prisma.order.findMany();
};
