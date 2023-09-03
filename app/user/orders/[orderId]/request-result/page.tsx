import React from "react";
import { Layout } from "@/app/user/components/Layout";
import { Container } from "@/app/user/components/Container";
import { Heading } from "@/app/(site)/components/Heading";
import { RequestResult } from "./components/RequestResult";
import { NavigationPanel } from "@/app/components/NavigationPanel";

interface IParams {
  orderId: string;
}

interface SearchParams {
  requestId: string;
  type: "Cancellation" | "Return";
  process: "pending" | "completed";
}

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: IParams;
  searchParams: SearchParams;
}) {
  return (
    <Layout>
      <Container>
        <div className="flex flex-col gap-8">
          <NavigationPanel
            heading={
              searchParams.type === "Cancellation"
                ? "Cancellation Request Result"
                : "Return Request Result"
            }
          />

          <Heading className="hidden max-md:text-center sm:block">
            {searchParams.type === "Cancellation"
              ? "Cancellation Request Result"
              : "Return Request Result"}
          </Heading>

          <RequestResult
            type={searchParams.type}
            requestId={searchParams.requestId}
            process={searchParams.process}
          />
        </div>
      </Container>
    </Layout>
  );
}
