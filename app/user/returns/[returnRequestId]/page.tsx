import React, { Suspense } from "react";
import { Layout } from "../../components/Layout";
import { Container } from "../../components/Container";
import { Heading } from "@/app/(site)/components/Heading";
import { ReturnDetails } from "./components/ReturnDetails";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { NavigationPanel } from "@/app/components/NavigationPanel";

interface IParams {
  returnRequestId: string;
}

export default async function ReturnDetailsPage({
  params,
}: {
  params: IParams;
}) {
  return (
    <Layout>
      <Container>
        <div className="flex h-full flex-col gap-6">
          <NavigationPanel heading="Return Details" />
          <Heading className="hidden sm:block">Return Details</Heading>

          <Suspense fallback={<SpinnerLoading />}>
            <ReturnDetails returnRequestId={params.returnRequestId} />
          </Suspense>
        </div>
      </Container>
    </Layout>
  );
}
