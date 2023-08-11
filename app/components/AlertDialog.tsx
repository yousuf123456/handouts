import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./Button"
import { twMerge } from "tailwind-merge";

interface AlertDialogProps {
  children : React.ReactNode;
  actionClassName? : string;
  actionLabel? : string;
  action : ()=> void;
  title : string;
  desc : string;
}
 
export function AlertDialogModel({
  title,
  desc,
  children,
  actionClassName,
  actionLabel,
  action

}: AlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        { children }
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{ title }</AlertDialogTitle>
          <AlertDialogDescription>
            { desc }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={action} className={twMerge("bg-themeBlue hover:bg-blue-600", actionClassName)}>
            { actionLabel || "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}