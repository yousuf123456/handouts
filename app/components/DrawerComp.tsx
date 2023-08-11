import Drawer from '@mui/material/Drawer'
import React from 'react'
import { FaTimes } from "react-icons/fa"

import { CrossIcon } from "lucide-react"

interface DrawerCompProps {
    open : boolean;
    setOpen : any;
    children : React.ReactNode
}

export const DrawerComp: React.FC<DrawerCompProps> = ({
    open,
    setOpen,
    children
}) => {
  return (
    <div>
        <Drawer
            anchor="right"
            open={open}
            PaperProps={{sx : { width : 320, paddingY : 3, paddingX : 1 }}}
            onClose={()=> setOpen(false)}
            disableScrollLock={false}
        >
            <>
                <FaTimes 
                    className='w-5 h-5 text-slate-600 absolute top-3 left-4 cursor-pointer' 
                    onClick={()=> setOpen(false)} 
                />
                { children }
            </>
        </Drawer>
    </div>
  )
}
