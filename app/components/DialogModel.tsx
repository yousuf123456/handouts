import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "../utils/cn";

interface DialogModelProps {
  open: boolean;
  setOpen: any;
  className?: string;
  children: ReactNode;
  onOpenChange?: any;
}

export const DialogModel: React.FC<DialogModelProps> = ({
  open,
  onOpenChange,
  children,
  setOpen,
  className,
}) => {
  return (
    <Dialog
      open={open !== undefined ? open : undefined}
      onOpenChange={onOpenChange || setOpen}
    >
      <DialogContent className={cn("py-4", className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
