import React from "react";
import { InformationLoading } from "./[productId]/components/containers/loadings/InformationLoading";
import { NavigationPanel } from "../components/NavigationPanel";
import { DetailsLoading } from "./[productId]/components/containers/loadings/DetailsLoading";
import { ReviewsLoading } from "./[productId]/components/containers/loadings/ReviewsLoading";
import { QuestionsLoading } from "./[productId]/components/containers/loadings/QuestionsLoading";
import { SimilarProductsLoading } from "./[productId]/components/containers/loadings/SimilarProductsLoading";
import { ProductsFromStoreLoading } from "./[productId]/components/containers/loadings/ProductsFromStoreLoading";
import { Container } from "./[productId]/components/Container";

export default function loading() {
  return (
    <div className="w-full overflow-x-hidden bg-slate-100 sm:px-4 sm:py-4 lg:mt-8 lg:px-8 lg:py-8 xl:px-20">
      <NavigationPanel showSearchBar showCart showShare />

      <div className="flex flex-col gap-6">
        <InformationLoading />

        <div className="flex items-start gap-6 max-lg:flex-col">
          <div className="flex w-full flex-col gap-5">
            <Container>
              <DetailsLoading />
            </Container>

            <Container id="ratings">
              <ReviewsLoading />
            </Container>

            <Container id="questions">
              <QuestionsLoading />
            </Container>

            <Container>
              <SimilarProductsLoading />
            </Container>
          </div>

          <ProductsFromStoreLoading />
        </div>
      </div>
    </div>
  );
}
