import React from "react";

export const Testing = async ({ label }: any) => {
  await new Promise((resolve) => setTimeout(resolve, 7000));
  return <div>{label || "Product Details"}</div>;
};
