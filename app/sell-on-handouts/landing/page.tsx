import React from "react";
import { CreateStoreSteps } from "./components/CreateStoreSteps";
import { Promo } from "./components/Promo";
import { Guide } from "./components/Guide";
import { SellerTypes } from "./components/SellerTypes";
import { Testemonials } from "./components/Testemonials";
import { FAQ } from "./components/FAQ";
import { becomeASellerGuideQuestions } from "@/app/constants/FAQ's/BecomeASellerGuide";

export default async function LandingPage() {
  return (
    <div className="bg-white px-12 py-6">
      <div className="flex flex-col gap-8">
        <CreateStoreSteps />
        <Promo />
        <Guide />
        <SellerTypes />
        <Testemonials />
        <div className="px-16">
          <FAQ questions={becomeASellerGuideQuestions} />
        </div>
      </div>
    </div>
  );
}
