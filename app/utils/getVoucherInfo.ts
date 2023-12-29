import { VoucherType } from "../types";

export const getVoucherInfo = (voucher: VoucherType) => {
  let hasCollectionStarted = false;
  let voucherUsagePer = (voucher.vouchersUsed / voucher.totalVouchers) * 100;

  const currentDate = new Date();
  if (currentDate > new Date(voucher.collectStartDate.$date))
    hasCollectionStarted = true;

  return {
    hasCollectionStarted,
    voucherUsagePer,
  };
};
