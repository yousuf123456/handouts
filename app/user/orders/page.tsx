import React, { Suspense } from "react";

import { Container } from "../components/Container";
import { Layout } from "../components/Layout";
import { Orders } from "./components/Orders";
import { Loading } from "../components/Loading";

interface SearchParams {
  page: string | undefined;
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <Layout>
      <Container>
        <Suspense fallback={<Loading heading="My Orders" />}>
          <Orders
            pageNumber={parseInt(searchParams.page || "0") || undefined}
          />
        </Suspense>
      </Container>
    </Layout>
  );
}
