import React, { useState } from "react";
import { Alert_DialogModel } from "@/app/components/Alert_DialogModel";
import { Button } from "@/app/components/Button";
import { DialogModel } from "@/app/components/DialogModel";
import { AddAddressForm } from "./AddAddressForm";
import { AddressType } from "@/app/types";

interface AddAddressFormModelProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  editingAddress?: AddressType | undefined;
  children: React.ReactNode;
}

export default function AddAddressFormModel({
  setOpen,
  open,
  editingAddress,
  children,
}: AddAddressFormModelProps) {
  const [alertOpen, setAlertOpen] = useState(false);

  const handleOnOpenChange = (e: any) => {
    open && setAlertOpen(true);
  };

  return (
    <>
      <DialogModel
        open={open}
        setOpen={setOpen}
        onOpenChange={handleOnOpenChange}
        className="h-[500px] max-w-[720px] overflow-y-auto"
        title="Add New Address"
        trigger={children}
      >
        <AddAddressForm setOpen={setOpen} editingAddress={editingAddress} />
      </DialogModel>

      {alertOpen && (
        <Alert_DialogModel
          title="Close Address Form"
          desc="You have not finished completing the form yet. Do you want to discard entering the form ? Entered data will be lost."
          action={
            <Button
              className="bg-transparent text-slate-600 hover:bg-transparent"
              onClick={() => setAlertOpen(false)}
            >
              Keep Editing
            </Button>
          }
          open={alertOpen}
          setOpen={setAlertOpen}
          onOpenChange={() => {
            if (alertOpen) {
              setOpen(false);
              setAlertOpen(false);
            }
          }}
        />
      )}
    </>
  );
}
