import React, { ReactNode } from "react";

import { DialogModel } from "./DialogModel";
import { Button } from "./Button";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Alert_DialogModelProps {
  title: string;
  desc: string;
  open: boolean;
  onOpenChange?: any;
  action?: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Alert_DialogModel: React.FC<Alert_DialogModelProps> = ({
  title,
  desc,
  open,
  action,
  onOpenChange,
  setOpen,
}) => {
  return (
    <DialogModel open={open} setOpen={setOpen}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>

      <div className="flex h-full w-full flex-col gap-6">
        {desc}

        <div className="flex w-full justify-end gap-3">
          <Button
            type="button"
            onClick={onOpenChange ? onOpenChange : () => open && setOpen(false)}
            className="border-[1px] border-slate-300 bg-transparent text-black hover:bg-slate-100 hover:text-black"
          >
            Close
          </Button>
          {action}
        </div>
      </div>
    </DialogModel>
  );
};
