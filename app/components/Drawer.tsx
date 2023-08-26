import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect } from "react";
import { cn } from "../utils/cn";

interface DrawerProps {
  open: boolean;
  className?: string;
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  side?: "top" | "bottom" | "left" | "right" | null | undefined;
}

export function Drawer({
  open,
  side,
  setOpen,
  className,
  children,
}: DrawerProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className={cn("z-[999] overflow-auto scrollbar-none", className)}
        side={side}
      >
        {children}
      </SheetContent>
    </Sheet>
  );
}
