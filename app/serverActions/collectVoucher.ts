"use server";

import prisma from "../libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { VoucherType } from "../types";

interface ParamsType {
  stringifiedVoucher: string;
}

export const collectVoucher = async (params: ParamsType) => {
  try {
    const userSession = await getServerSession(authOptions);
    if (!userSession || !userSession.user || !userSession.user.id)
      return "Unauthorized";

    const { stringifiedVoucher } = params;
    const voucher = JSON.parse(stringifiedVoucher) as VoucherType & {
      bucketId: string;
    };

    await prisma?.$transaction([
      prisma.user.update({
        where: {
          id: userSession.user.id,
        },
        data: {
          collectedVouchers: {
            push: voucher,
          },
        },
      }),
      prisma.$runCommandRaw({
        findAndModify: "PromoToolsBucket",
        query: {
          _id: { $oid: voucher.bucketId },
          vouchers: { $elemMatch: { _id: voucher._id } },
        },
        update: {
          $inc: { "vouchers.$.vouchersUsed": 1 },
          $push: {
            "vouchers.$.usedBy": userSession.user.id,
          },
        },
      }),
    ]);

    return "Collected Voucher Succesfully";
  } catch (e) {
    console.log(e);
    return "Something goes wrong";
  }
};
