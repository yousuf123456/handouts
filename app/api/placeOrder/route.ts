import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function POST(req: Request) {
  try {
    const {
      fromCart,
      orderData,
      productIds,
      packagesData,
      storesAssociatedToOrder,
    } = await req.json();

    const currentUser = await getCurrentUser({ flushCart: fromCart });
    if (!currentUser || !currentUser.id) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    const [createdOrder, updatedProducts] = await prisma.$transaction([
      prisma.order.create({
        data: {
          shippingAddress: orderData.shippingAddress,
          billingAddress: orderData.billingAddress,
          totalQuantity: orderData.totalQuantity,
          totalAmmount: orderData.totalAmmount,
          emailTo: orderData.emailTo,
          customer: {
            connect: {
              id: currentUser.id,
            },
          },
          packages: {
            create: packagesData,
          },

          associatedStores: {
            connect: storesAssociatedToOrder,
          },
        },
      }),

      prisma.product.updateMany({
        where: {
          id: {
            in: productIds,
          },
        },
        data: {
          numOfSales: {
            increment: 1,
          },
        },
      }),
    ]);

    if (!createdOrder) {
      return new NextResponse("Something went wrong", { status: 500 });
    }

    return NextResponse.json(createdOrder);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Serer Error", { status: 500 });
  }
}
