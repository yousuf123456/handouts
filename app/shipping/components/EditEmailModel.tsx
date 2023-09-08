"use client";
import { Button } from "@/app/components/Button";
import { DialogModel } from "@/app/components/DialogModel";
import { input2Styling } from "@/app/components/Input2";
import { validateEmail } from "@/app/utils/validateEmail";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

interface EditEmailModelProps {
  setOpen: any;
  open: boolean;
  email: string | null | undefined;
  onSave: (newEmail: string | null | undefined) => void;
}

export const EditEmailModel: React.FC<EditEmailModelProps> = ({
  open,
  email,
  onSave,
  setOpen,
}) => {
  const [newEmail, setNewEmail] = useState(email);

  useEffect(() => {
    setNewEmail(email);
  }, [email]);

  return (
    <DialogModel open={open} setOpen={setOpen}>
      <DialogHeader>
        <DialogTitle>Change Email Address</DialogTitle>
      </DialogHeader>
      <div className="mt-6 flex w-full flex-col gap-6">
        <div className="flex flex-col gap-2">
          <input
            value={newEmail ? newEmail : ""}
            onChange={(e) => setNewEmail(e.target.value)}
            className={clsx(
              input2Styling,
              newEmail?.length
                ? "bg-white ring-2 ring-green-400"
                : "bg-slate-100 focus-visible:ring-2 focus-visible:ring-green-400",
            )}
          />

          {!validateEmail(newEmail) && (
            <p className="font-text text-sm text-rose-500">
              Please enter valid email address
            </p>
          )}
        </div>

        <DialogClose className="w-full">
          <Button
            Disabled={!validateEmail(newEmail)}
            className="w-full"
            onClick={() => onSave(newEmail)}
          >
            Save
          </Button>
        </DialogClose>
      </div>
    </DialogModel>
  );
};
