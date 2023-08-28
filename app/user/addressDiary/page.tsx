import React from "react";

import { NavigationPanel } from "@/app/components/NavigationPanel";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import { AddressDiary } from "./components/AddressDiary";
import { ReduxProvider } from "@/app/context/ReduxProvider";

export default async function AddressDiaryPage() {
  return (
    <Layout>
      <Container>
        <NavigationPanel heading="Address Diary" />
        <ReduxProvider>
          <AddressDiary />
        </ReduxProvider>
      </Container>
    </Layout>
  );
}
