"use client";

import React from 'react'

import { HiChevronRight } from "react-icons/hi"
import { Breadcrumbs, Link, Typography } from '@mui/material'

interface BreadCrumbs {
    crumbs : {
        label : string;
        href : string;
    }[]
}

export const BreadCrumbs: React.FC<BreadCrumbs> = ({
    crumbs
}) => {

    const color = "#2998FF"

  return (
    <div className='flex gap-1 items-center'>
        <Breadcrumbs separator={<HiChevronRight />}>
            {
                crumbs.map((crumb, i)=> (
                    <div key={i}> 
                    {
                        i !== crumbs.length - 1 ?
                        <Link underline="hover" fontFamily={"var(--font-poppins)"} color={color} href={crumb.href}>
                            { crumb.label }
                        </Link>
                        :
                        <Typography color="text.primary" fontFamily={"var(--font-poppins)"}>
                            { crumb.label }
                        </Typography>
                    } 
                    </div>
                ))
            }
        </Breadcrumbs>
    </div>
  )
}
