import React from "react";
import { Module } from "../Module";
import prisma from "@/app/libs/prismadb";
import { VoucherType } from "@/app/types";

import Voucher from "@/app/components/Voucher";

const getVoucher = async (params: {
  voucherSelection: "automatic" | "manual" | "filter";
  voucherId?: string;
  bucketId?: string;
  storeId?: string;
}) => {
  const { voucherSelection, voucherId, bucketId, storeId } = params;

  const pipeline = [
    {
      ...(voucherSelection === "automatic" && {
        $sort: {
          bucketId: -1,
        },
      }),
    },

    {
      $match: {
        ...(voucherSelection === "automatic"
          ? { storeId: { $oid: storeId } }
          : { _id: { $oid: bucketId } }),
      },
    },

    {
      $project: {
        ...(voucherSelection === "manual"
          ? {
              voucher: {
                $filter: {
                  input: "$vouchers",
                  as: "voucher",
                  cond: { $eq: ["$$voucher._id", { $oid: voucherId }] },
                },
              },
            }
          : {
              voucher: {
                $arrayElemAt: [
                  "$vouchers",
                  { $subtract: [{ $size: "$vouchers" }, 1] },
                ],
              },
            }),
      },
    },
  ];

  const data = (await prisma.promoToolsBucket.aggregateRaw({
    pipeline: pipeline,
  })) as any;

  if (!data[0].voucher) return null;

  return data[0].voucher[0] || data[0].voucher;
};

interface VoucherCardProps {
  data: {
    bucketId?: string;
    voucherId?: string;
    moduleHeading?: string;
    hideModuleHeading?: boolean;
    voucherSelection: "automatic" | "manual" | "filter";
  };

  storeId: string;
}

export default async function VoucherCard({ data, storeId }: VoucherCardProps) {
  if (data.voucherSelection === "manual" && (!data.bucketId || !data.voucherId))
    return;

  const voucher = (await getVoucher({
    voucherId: data.bucketId,
    bucketId: data.voucherId,
    storeId,
    voucherSelection: data.voucherSelection,
  })) as VoucherType;

  if (!voucher) return;

  return (
    <Module
      moduleHeading={data.moduleHeading}
      hideModuleHeading={data.hideModuleHeading}
    >
      <div>
        <Voucher voucher={voucher} thickVersion />
      </div>
    </Module>
  );
}
