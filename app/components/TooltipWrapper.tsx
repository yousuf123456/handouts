
import React, { ReactNode } from 'react'

import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import  { createTheme, styled } from '@mui/material/styles';


  interface TooltipWrapperProps {
    content : string;
    children : ReactNode;
    color? : string;
    textColor? : string;
    arrow? : boolean;
  }

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({ content, children, arrow, color, textColor }) => {
  const BootstrapTooltip : any = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#1e1b4b",
      opacity : 0
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: color ? color : "#1e1b4b",
      color : textColor ? textColor : "#ffffff",
      fontSize : "12px",
      fontWeight : "600",
      fontFamily : "var(--font-poppins)",
      padding : "6px 12px",
      letterSpacing : "0.2px"
    },
  }));

  return (
    <BootstrapTooltip title={content} >
      <div>
        { children }
      </div>
    </BootstrapTooltip>
  )
}
