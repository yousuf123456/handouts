import { NextResponse } from "next/server";

import prisma from "../../libs/prismadb";

export async function POST(req: Request) {
  try {
    const { productId, storeId, superTokensUserId } = await req.json();

    await prisma.$transaction([
      prisma.productClick.create({
        data: {
          superTokensUserId: superTokensUserId,
          productId: productId,
          storeId: storeId,
        },
      }),

      prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          clicks: {
            increment: 1,
          },
        },
      }),
    ]);

    return NextResponse.json("Created a click succesfully");
  } catch (e) {
    return new NextResponse("Internal Server Error !", { status: 500 });
  }
}
