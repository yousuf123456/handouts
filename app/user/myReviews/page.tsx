import React, { Suspense } from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import { ToBeReviewedReviews } from "./components/ToBeReviewedReviews";
import { HistoryReviews } from "./components/HistoryReviews";
import { ToggleBar } from "./components/ToggleBar";
import { ReviewsLoading } from "./components/loadings/ReviewsLoading";
import { NavigationPanel } from "@/app/components/NavigationPanel";
import { getUserReviews } from "@/app/actions/getUserReviews";
import { HistoryReviewType } from "@/app/types";

interface SearchParams {
  isHistory: string;
  toBeReviewed: string;
  page: string | undefined;
}

export default async function MyReviewsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const toBeReviewed = searchParams.toBeReviewed === "true";
  const history = searchParams.isHistory === "true";

  return (
    <Layout>
      <Container>
        <div className="flex h-full flex-col gap-6">
          <NavigationPanel
            heading={
              searchParams.isHistory ? "History Reviews" : "To Be Reviewed"
            }
          />

          <ToggleBar />

          {toBeReviewed ? (
            <Suspense fallback={<ReviewsLoading />}>
              <ToBeReviewedReviews
                pageNumber={parseInt(searchParams.page || "0")}
              />
            </Suspense>
          ) : (
            <Suspense fallback={<ReviewsLoading />}>
              <HistoryReviews pageNumber={parseInt(searchParams.page || "0")} />
            </Suspense>
          )}
        </div>
      </Container>
    </Layout>
  );
}
