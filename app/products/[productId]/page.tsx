import React, { Suspense } from "react";

import { Container } from "./components/Container";
import { Information } from "./components/containers/Information";
import { Reviews } from "./components/containers/Reviews";
import { Questions } from "./components/containers/Questions";
import { Details } from "./components/containers/Details";
import { InformationLoading } from "./components/containers/loadings/InformationLoading";
import { ReviewsLoading } from "./components/containers/loadings/ReviewsLoading";
import { QuestionsLoading } from "./components/containers/loadings/QuestionsLoading";
import { DetailsLoading } from "./components/containers/loadings/DetailsLoading";
import { ProductsFromStore } from "./components/containers/ProductsFromStore";
import { ProductsFromStoreLoading } from "./components/containers/loadings/ProductsFromStoreLoading";
import { SimilarProducts } from "./components/containers/SimilarProducts";
import { SimilarProductsLoading } from "./components/containers/loadings/SimilarProductsLoading";
import { NavigationPanel } from "@/app/components/NavigationPanel";

// import prisma from "../../libs/prismadb";

interface IParams {
  productId: string;
}

// export const dynamicParams = true;
// export const revalidate = 7200;

// export async function generateStaticParams() {
//   const products = await prisma.product.findMany({
//     select: {
//       id: true,
//     },
//   });
//   return products.map((product) => ({ productId: product.id }));
// }

export default async function ProductDetailsPage({
  params,
}: {
  params: IParams;
}) {
  return (
    <div className="w-full overflow-x-hidden bg-slate-100 sm:px-4 sm:py-4 lg:mt-8 lg:px-8 lg:py-8 xl:px-20">
      <NavigationPanel showSearchBar showCart showShare />

      <div className="flex flex-col gap-6">
        <Suspense fallback={<p>Loading</p>}>
          <Information productId={params.productId} />
        </Suspense>

        <div className="flex items-start gap-6 max-lg:flex-col">
          <div className="flex w-full flex-col gap-5">
            <Container>
              <Suspense key="details" fallback={<p>Details Loading</p>}>
                <Details productId={params.productId} />
              </Suspense>
            </Container>

            <Container id="ratings">
              <Suspense key="reviews" fallback={<p>Rating Loading</p>}>
                <Reviews productId={params.productId} />
              </Suspense>
            </Container>

            <Container id="questions">
              <Suspense key="questions" fallback={<p>Questions Loading</p>}>
                <Questions productId={params.productId} />
              </Suspense>
            </Container>

            <Suspense key="similarProducts" fallback={<p>Loading</p>}>
              <Container>
                <SimilarProducts productId={params.productId} />
              </Container>
            </Suspense>
          </div>

          <Suspense key="productsfromsamestore" fallback={<p>Loading</p>}>
            <ProductsFromStore productId={params.productId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
