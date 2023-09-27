import prisma from "../../libs/prismadb";

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { OrderedProductType, PackageType, StatusType } from "@/app/types";
import { CancellationRequest, ReturnRequest } from "@prisma/client";

type ReqType = {
  updatedOrderedProducts: OrderedProductType[];
  type: "Cancellation" | "Return";
  updatedPackages: PackageType[];
  orderFeedback: string;
  proofImages: string[];
  orderId: string;
  storeIds: { id: string }[];
};

const getRequestStatus = (updatedOrderedProducts: OrderedProductType[]) => {
  let cancelled = true;
  let returnInProcess = true;
  let cancellationInProcess = true;

  updatedOrderedProducts.map((orderedProduct) => {
    const status = orderedProduct.status;
    if (status !== "Cancellation in Process") cancellationInProcess = false;
    if (status !== "Return in Process") returnInProcess = false;
    if (status !== "Cancelled") cancelled = false;
  });

  if (cancelled && !returnInProcess && !cancellationInProcess)
    return "Cancelled";
  if (returnInProcess && !cancellationInProcess && !cancelled)
    return "Return in Process";
  if (cancellationInProcess && !returnInProcess && !cancelled)
    return "Cancellation in Process";

  return "";
};

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    const {
      type,
      orderId,
      storeIds,
      proofImages,
      orderFeedback,
      updatedPackages,
      updatedOrderedProducts,
    }: ReqType = await req.json();

    // const updatedOrderedProductIds = updatedOrderedProducts.map((updatedOrderedProduct)=> ({ id : updatedOrderedProduct.id }))
    const requestStatus = getRequestStatus(updatedOrderedProducts);

    let request: CancellationRequest | ReturnRequest;
    if (type === "Cancellation") {
      request = await prisma.cancellationRequest.create({
        data: {
          status: requestStatus,

          requester: {
            connect: {
              id: currentUser.id,
            },
          },

          order: {
            connect: {
              id: orderId,
            },
          },
        },
      });
    } else {
      request = await prisma.returnRequest.create({
        data: {
          status: requestStatus,
          proofImages: proofImages,
          orderFeedback: orderFeedback,

          requester: {
            connect: {
              id: currentUser.id,
            },
          },

          order: {
            connect: {
              id: orderId,
            },
          },

          stores: {
            connect: storeIds,
          },
        },
      });
    }

    const updatingPackagesOperations = updatedPackages.map((updatedPackage) => {
      const { id, status } = updatedPackage;
      return prisma.package.update({
        where: {
          id: id,
        },

        data: {
          status: status,
        },
      });
    });

    const updatingOrderedProductsOperations = updatedOrderedProducts.map(
      (updatedOrderedProduct) => {
        const { id, ...data } = updatedOrderedProduct;
        return prisma.orderedProduct.update({
          where: {
            id: id,
          },

          data: {
            ...data,
            ...(type === "Cancellation"
              ? { cancellationRequestId: request.id }
              : {}),
            ...(type === "Return" ? { returnRequestId: request.id } : {}),
          },
        });
      },
    );

    const results = await prisma.$transaction([
      ...updatingOrderedProductsOperations,
      ...updatingPackagesOperations,
    ]);

    const dataToReturn = {
      requestId: request.id,
      process: request.status === "Cancelled" ? "completed" : "pending",
    };

    return NextResponse.json(dataToReturn);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
