
import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { cn } from '../utils/cn';

interface DialogModelProps {
    open? : boolean;
    title? : string;
    trigger? : ReactNode;
    setOpen? : any;
    className? : string;
    children? : ReactNode;
    onOpenChange? : any;
}

export const DialogModel: React.FC<DialogModelProps> = ({
    open,
    title,
    trigger,
    children,
    className,
    onOpenChange,
}) => {
  return (
    <Dialog 
        open={open !== undefined ? open : undefined} 
        onOpenChange={onOpenChange}
    >
        <DialogTrigger>
            { trigger }
        </DialogTrigger>
        <DialogContent className={cn("py-4", className)}>
            <DialogHeader className='h-full'>
                <DialogTitle className='text-themeSecondary font-text'>
                    { title }
                </DialogTitle>
                <DialogDescription className='h-full'>
                    { children }
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  ) 
}
