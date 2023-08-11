import React from 'react';

import styled from '@mui/material/styles/styled';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions  from '@mui/material/DialogActions';

import { Button } from '@/app/components/Button';
import CircularProgress from '@mui/material/CircularProgress';
import clsx from 'clsx';

import { FaCheckCircle, FaTimes } from "react-icons/fa"
import Link from 'next/link';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
}));

interface ActionsConfirmationProps {
    open : boolean;
    isLoading : boolean;
    isError : boolean;
    label : string;
    buttonLabel : string;
    href : string;
    setOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

export const ActionsConfirmation: React.FC<ActionsConfirmationProps> = ({
    open,
    isLoading,
    isError,
    label,
    buttonLabel,
    href,
    setOpen,
})=> {
  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={()=>setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent dividers>
            {
                isLoading ? (
                    <div className='w-full flex justify-center'>
                        <CircularProgress color="secondary" />
                    </div>
                )
                : (
                    <div className='pb-12 flex gap-2 items-center'>
                        {
                            isError ? 
                            <FaTimes className='w-5 h-5 text-red-500' />
                            :
                            <FaCheckCircle className='w-5 h-5 text-green-500' />
                        }
                        <h2 className={clsx('text-xl font-text font-medium', isError ? "text-red-600" : "text-green-600")}>
                            { label }
                        </h2>
                    </div>
                )
            }
        </DialogContent>

        <DialogActions sx={{ paddingRight : 3, gap : 2 }}>
          {
            buttonLabel && (
              <Link href={href}>
                <Button variant={"default"} isLoading={isLoading} disabled={isLoading}>
                  { buttonLabel }
                </Button>
              </Link>
            )
          }

          <Button className='flex items-center h-8' variant={"outline"} isLoading={isLoading} disabled={isLoading} onClick={()=>setOpen(false)}>
              Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}