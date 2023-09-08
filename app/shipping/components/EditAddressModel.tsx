"use client";

import { AddressCard } from "@/app/components/AddressCard";
import { Button } from "@/app/components/Button";
import { DialogModel } from "@/app/components/DialogModel";
import { AddressType } from "@/app/types";
import AddAddressFormModel from "@/app/user/addressDiary/components/AddAddressFormModel";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";

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

  return (
    <DialogModel
      open={open}
      setOpen={setOpen}
      className="max-w-[720px] overflow-y-auto sm:h-[500px]"
    >
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="flex h-full w-full flex-col gap-6 max-sm:pb-16">
        <div className="mt-8 grid grid-cols-1 gap-4 max-[600px]:place-items-center min-[600px]:grid-cols-2">
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

        <div className="flex w-full items-end justify-between max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:bg-slate-100 max-sm:p-3 sm:mt-8 sm:h-full">
          <Button onClick={() => setFormModelOpen((prev) => !prev)}>
            Add New Address
          </Button>
          <AddAddressFormModel
            open={formModelOpen}
            editingAddress={editingAddress}
            setOpen={setFormModelOpen}
          />

          <Button onClick={() => setOpen(false)}>Save</Button>
        </div>
      </div>
    </DialogModel>
  );
}
