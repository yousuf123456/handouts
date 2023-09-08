import React, { Suspense } from "react";
import { ProductInformation } from "../ProductInformation";
import { getProductInfoById } from "@/app/actions/getProductDetailsById/getProductInfoById";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import { Container } from "../Container";
import { CategoriesType } from "@/app/types";
import { getCategoryTree } from "@/app/utils/getCategoryTree";
import { CategoryBreadCrumbs } from "@/app/[category]/components/CategoryBreadCrumbs";
import { InformationLoading } from "./loadings/InformationLoading";
import { heavyAction } from "@/app/actions/heavyAction";

interface InformationProps {
  productId: string;
}

export async function Information({ productId }: InformationProps) {
  await heavyAction();
  await heavyAction();
  await heavyAction();
  await heavyAction();
  await heavyAction();
  await heavyAction();
  await heavyAction();
  await heavyAction();
  await heavyAction();
  await heavyAction();
  await heavyAction();
  await heavyAction();
  const productInfo = await getProductInfoById(productId);
  const categories = productInfo?.categoryTreeData as CategoriesType;

  const categoryTree = getCategoryTree(categories, null)[0];

  if (!productInfo) {
    return <p>Product not found</p>;
  }

  return (
    <Suspense fallback={<InformationLoading />}>
      <ReduxProvider>
        <div className="flex flex-col gap-2">
          <div className="hidden gap-1 sm:flex">
            <CategoryBreadCrumbs
              productName={productInfo.name}
              categoryTree={categoryTree}
              crumbColor="#f43f5e"
            />
          </div>

          <div className="flex flex-col gap-6">
            <Container noPaddingOnRes>
              <ProductInformation product={productInfo} />
            </Container>
          </div>
        </div>
      </ReduxProvider>
    </Suspense>
  );
}
