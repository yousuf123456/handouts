import { NavigationPanel } from "@/app/components/NavigationPanel";
import React from "react";
import { Form } from "./components/Form";
import { ReduxProvider } from "@/app/context/ReduxProvider";

export default async function AddAddressPage() {
  return (
    <div>
      <NavigationPanel heading="Add New Address" />
      <div className="mt-8 px-3 min-[420px]:px-6">
        <ReduxProvider>
          <Form />
        </ReduxProvider>
      </div>
    </div>
  );
}
