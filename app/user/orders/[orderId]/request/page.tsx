import React from "react";

import { Heading } from "@/app/(site)/components/Heading";
import { Container } from "@/app/user/components/Container";
import { Layout } from "@/app/user/components/Layout";
import { OrderRequestForm } from "./components/OrderRequestForm";
import { NavigationPanel } from "@/app/components/NavigationPanel";

interface SearchParams {
  type: "Cancellation" | "Return";
}

interface IParams {
  orderId: string;
}

export default async function RequestPage({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: IParams;
}) {
  return (
    <Layout>
      <Container>
        <div className="flex flex-col gap-6">
          <NavigationPanel
            heading={
              searchParams.type === "Cancellation"
                ? "Cancellation Request"
                : "Return Request"
            }
          />

          <Heading className="hidden max-md:text-center sm:block">
            {searchParams.type === "Cancellation"
              ? "Cancellation Request"
              : "Return Request"}
          </Heading>

          <OrderRequestForm type={searchParams.type} orderId={params.orderId} />
        </div>
      </Container>
    </Layout>
  );
}
