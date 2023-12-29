import React, { Suspense } from "react";

import { ProductInformation } from "../ProductInformation";
import { getProductInfoById } from "@/app/actions/getProductDetailsById/getProductInfoById";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import { Container } from "../Container";
import { CategoriesType } from "@/app/types";
import { getCategoryTree } from "@/app/utils/getCategoryTree";
import { CategoryBreadCrumbs } from "@/app/[category]/components/CategoryBreadCrumbs";
import { InformationLoading } from "./loadings/InformationLoading";

interface InformationProps {
  productId: string;
}

export default async function Information({ productId }: InformationProps) {
  const productInfo = await getProductInfoById(productId);

  if (!productInfo || !productInfo.data) {
    return <p>Product not found</p>;
  }

  const categories = productInfo.data.categoryTreeData as CategoriesType;

  const categoryTree = getCategoryTree(categories, null)[0];

  return (
    <Suspense fallback={<InformationLoading />}>
      <ReduxProvider>
        <div className="flex flex-col gap-2">
          <div className="hidden gap-1 sm:flex">
            <CategoryBreadCrumbs
              productName={productInfo.data.name}
              categoryTree={categoryTree}
              crumbColor="#f43f5e"
            />
          </div>

          <div className="flex flex-col gap-6">
            <Container noPaddingOnRes>
              <ProductInformation
                product={productInfo.data}
                vouchers={productInfo.vouchers}
                freeShipping={productInfo.freeShipping}
              />
            </Container>
          </div>
        </div>
      </ReduxProvider>
    </Suspense>
  );
}
