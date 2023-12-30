import React, { Suspense } from "react";

import { Layout } from "../components/Layout";
import { Returns } from "./components/Returns";
import { Loading } from "../components/Loading";
import { Container } from "../components/Container";
import { NavigationPanel } from "@/app/components/NavigationPanel";

interface SearchParams {
  page: string | undefined;
}

export default async function ReturnsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <Layout>
      <Container>
        <NavigationPanel heading="My Returns" />

        <Suspense fallback={<Loading heading="My Returns" />}>
          <Returns pageNumber={parseInt(searchParams.page || "0")} />
        </Suspense>
      </Container>
    </Layout>
  );
}
