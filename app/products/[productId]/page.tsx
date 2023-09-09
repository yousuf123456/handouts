import React, { Suspense } from "react";

import { Container } from "./components/Container";
import { Information } from "./components/containers/Information";
import { InformationLoading } from "./components/containers/loadings/InformationLoading";
import { ReviewsLoading } from "./components/containers/loadings/ReviewsLoading";
import { QuestionsLoading } from "./components/containers/loadings/QuestionsLoading";
import { DetailsLoading } from "./components/containers/loadings/DetailsLoading";
import { ProductsFromStoreLoading } from "./components/containers/loadings/ProductsFromStoreLoading";
import { SimilarProductsLoading } from "./components/containers/loadings/SimilarProductsLoading";
import { NavigationPanel } from "@/app/components/NavigationPanel";
import Details from "./components/containers/Details";
import Questions from "./components/containers/Questions";
import Reviews from "./components/containers/Reviews";
import SimilarProducts from "./components/containers/SimilarProducts";
import ProductsFromStore from "./components/containers/ProductsFromStore";
// import prisma from "../../libs/prismadb";
// import dynamic from "next/dynamic";

interface IParams {
  productId: string;
}

// const Details = dynamic(() => import("./components/containers/Details"));
// const Questions = dynamic(() => import("./components/containers/Questions"));
// const Reviews = dynamic(() => import("./components/containers/Reviews"));
// const ProductsFromStore = dynamic(
//   () => import("./components/containers/ProductsFromStore"),
// );
// const SimilarProducts = dynamic(
//   () => import("./components/containers/SimilarProducts"),
// );

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
  // await new Promise((resolve) => setTimeout(resolve, 100));

  return (
    <div className="w-full overflow-x-hidden bg-slate-100 sm:px-4 sm:py-4 lg:mt-8 lg:px-8 lg:py-8 xl:px-20">
      <NavigationPanel showSearchBar showCart showShare />

      <div className="flex flex-col gap-6">
        {/* <Suspense fallback={<InformationLoading />}>
        </Suspense> */}
        <Information productId={params.productId} />

        <div className="flex items-start gap-6 max-lg:flex-col">
          <div className="flex w-full flex-col gap-5">
            <Container>
              {/* <Suspense key="details" fallback={<DetailsLoading />}>
              </Suspense> */}
              <Details productId={params.productId} />
            </Container>

            <Container id="ratings">
              {/* <Suspense key="reviews" fallback={<ReviewsLoading />}>
              </Suspense> */}
              <Reviews productId={params.productId} />
            </Container>

            <Container id="questions">
              {/* <Suspense key="questions" fallback={<QuestionsLoading />}>
              </Suspense> */}
              <Questions productId={params.productId} />
            </Container>

            {/* <Suspense
              key="similarProducts"
              fallback={<SimilarProductsLoading />}
            >
            </Suspense> */}
            <Container>
              <SimilarProducts productId={params.productId} />
            </Container>
          </div>

          {/* <Suspense
            key="productsfromsamestore"
            fallback={<ProductsFromStoreLoading />}
          >
          </Suspense> */}
          <ProductsFromStore productId={params.productId} />
        </div>
      </div>
    </div>
  );
}
