import React, { Suspense } from "react";

import { Layout } from "../../components/Layout";
import { Container } from "../../components/Container";
import { Heading } from "@/app/(site)/components/Heading";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { OrderDetails } from "./components/OrderDetails";
import { NavigationPanel } from "@/app/components/NavigationPanel";

interface IParams {
  orderId: string;
}

export default async function OrderDetailsPage({
  params,
}: {
  params: IParams;
}) {
  return (
    <Layout>
      <Container>
        <div className="flex h-full flex-col gap-6">
          <NavigationPanel heading="Order Details" />

          <Heading className="hidden text-center sm:block md:text-start">
            Order Details
          </Heading>

          <Suspense fallback={<SpinnerLoading />}>
            <OrderDetails orderId={params.orderId} />
          </Suspense>
        </div>
      </Container>
    </Layout>
  );
}
