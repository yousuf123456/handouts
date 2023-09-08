import { NavigationPanel } from "@/app/components/NavigationPanel";
import React from "react";
import { Form } from "./components/Form";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import { BASE_URL } from "@/app/constants/consts";
import axios from "axios";
import { AddressType } from "@/app/types";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { User } from "@prisma/client";

interface SearchParams {
  id: string | undefined;
  update: string | undefined;
}

export default async function AddAddressPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user =
    searchParams.update === "true"
      ? ((await getCurrentUser({ getAddressDiary: true })) as User)
      : undefined;

  const address = user
    ? user.addressDiary.filter(
        (address: any) => address._id === searchParams.id,
      )[0]
    : undefined;

  return (
    <div>
      <NavigationPanel
        heading={searchParams.update ? "Edit Address" : "Add New Address"}
      />
      <div className="mt-8 px-3 min-[420px]:px-6">
        <ReduxProvider>
          <Form
            update={searchParams.update === "true"}
            editingAddress={address as AddressType | undefined}
          />
        </ReduxProvider>
      </div>
    </div>
  );
}
