"use client";
import React, { useState } from "react";

import { AddressType } from "@/app/types";
import { Button } from "@/app/components/Button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogModel } from "@/app/components/DialogModel";
import { AddressCard } from "@/app/components/AddressCard";
import { usePathname, useSearchParams } from "next/navigation";
import AddAddressFormModel from "@/app/user/addressDiary/components/AddAddressFormModel";

import Link from "next/link";

interface EditAddressModelProps {
  title: string;
  open: boolean;
  addressDiary: AddressType[];
  selectedAddress: AddressType | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: (address: AddressType) => void;
}

export default function EditAddressModel({
  title,
  open,
  addressDiary,
  selectedAddress,
  setOpen,
  onClick,
}: EditAddressModelProps) {
  const [formModelOpen, setFormModelOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressType>();

  const onEdit = (address: AddressType) => {
    setEditingAddress(address);
    setFormModelOpen(true);
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <DialogModel
      open={open}
      setOpen={setOpen}
      className="h-screen max-w-[720px] overflow-y-auto sm:h-[500px]"
    >
      <DialogHeader>
        <DialogTitle className="text-left font-semibold text-themeSecondary sm:text-left">
          {title}
        </DialogTitle>
      </DialogHeader>
      <div className="flex h-full w-full flex-col gap-2 sm:gap-6">
        <div className="mt-8 grid w-full grid-cols-1 gap-4 max-sm:order-2 max-[600px]:place-items-center min-[600px]:grid-cols-2">
          {addressDiary?.map((address, i) => (
            <AddressCard
              key={i}
              onClick={onClick}
              address={address}
              dynamicWidth={true}
              dynamicHeight={true}
              onEdit={() => onEdit(address)}
              isSelected={selectedAddress?.address === address.address}
            />
          ))}
        </div>

        <div className="mt-4 flex w-full items-end justify-between sm:mt-8 sm:h-full">
          <div className="hidden sm:block">
            <Button onClick={() => setFormModelOpen((prev) => !prev)}>
              Add New Address
            </Button>
            <AddAddressFormModel
              open={formModelOpen}
              editingAddress={editingAddress}
              setOpen={setFormModelOpen}
            />
          </div>

          <div className="sm:hidden">
            <Link
              href={`/user/addAddress?update=false&redirect=${
                pathname + "?" + searchParams
              }`}
            >
              <Button>Add New Address</Button>
            </Link>
          </div>

          <Button onClick={() => setOpen(false)}>Save</Button>
        </div>
      </div>
    </DialogModel>
  );
}
