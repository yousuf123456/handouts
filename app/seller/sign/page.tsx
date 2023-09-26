//Moved To A New Website

import React from "react";
import { SignForm } from "./components/SignForm";
import { WhySellOnHandouts } from "./components/WhySellOnHandouts";
import { FAQ } from "@/app/sell-on-handouts/landing/components/FAQ";
import { becomeASellerGuideQuestions } from "@/app/constants/FAQ's/BecomeASellerGuide";
import { StepsToStartSelling } from "./components/StepsToStartSelling";
import { Testemonials } from "./components/Testemonials";

export default function SellerSignPage() {
  return (
    <div className="bg-white">
      <div className="flex flex-col gap-12 pb-8">
        <SignForm />

        <div className="flex flex-col gap-16 px-12">
          <WhySellOnHandouts />

          <Testemonials />

          <StepsToStartSelling />

          <FAQ questions={becomeASellerGuideQuestions} />
        </div>
      </div>
    </div>
  );
}
