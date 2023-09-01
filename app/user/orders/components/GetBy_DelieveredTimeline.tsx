import React from "react";
import { FaPlane } from "react-icons/fa";
import { KeyValuePairInfo } from "./KeyValuePairInfo";

export const GetBy_DelieveredTimeline = ({
  createdAt,
  isDelievered,
}: {
  createdAt?: Date | null;
  isDelievered?: boolean;
}) => {
  return (
    <KeyValuePairInfo
      Key={isDelievered ? "Delievered At : " : "Get By : "}
      value={createdAt || null}
      keyClassName="font-medium text-green-500 text-xs md:text-sm"
      valueClassName="font-medium text-green-500 text-xs md:text-sm"
      Icon={FaPlane}
    />
  );
};
