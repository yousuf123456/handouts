import React, { Suspense } from "react";
import { Layout } from "../../components/Layout";
import { Container } from "../../components/Container";
import { Heading } from "@/app/(site)/components/Heading";
import { CancellationDetails } from "./components/CancellationDetails";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { NavigationPanel } from "@/app/components/NavigationPanel";

interface IParams {
  cancellationRequestId: string;
}

export default async function CancellationRequestDetailsPage({
  params,
}: {
  params: IParams;
}) {
  return (
    <Layout>
      <Container>
        <div className="flex h-full flex-col gap-6">
          <NavigationPanel heading="Cancellation Details" />

          <Heading className="hidden sm:block">Cancellation Details</Heading>

          <Suspense fallback={<SpinnerLoading />}>
            <CancellationDetails
              cancellationRequestId={params.cancellationRequestId}
            />
          </Suspense>
        </div>
      </Container>
    </Layout>
  );
}
