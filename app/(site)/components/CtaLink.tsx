import Link from 'next/link'
import React, { ReactNode } from 'react'

interface CtaLinkProps {
    href : string;
    children : ReactNode;
}

export const CtaLink: React.FC<CtaLinkProps> = ({
    href,
    children
}) => {
  return (
    <Link href={href ? href : "undefined"}>
      { children }
    </Link>
  )
}
