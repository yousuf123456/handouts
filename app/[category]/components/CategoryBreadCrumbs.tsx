"use client"
import { formatCategoryParam } from '@/app/utils/formatCategoryParam'
import { getCategoryNames } from '@/app/utils/getCategoryNames'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useSearchParams } from 'next/navigation'

import React from 'react'
import { HiChevronRight } from 'react-icons/hi'

interface CategoryBreadCrumbsProps {
    categoryTree : any
}

export const CategoryBreadCrumbs: React.FC<CategoryBreadCrumbsProps> = ({
    categoryTree
}) => {

    const from = useSearchParams().get("from");

  return (
    <div>
        {
            categoryTree === null ? (
                <Breadcrumbs separator={<HiChevronRight />}
                 aria-label="breadcrumb">
                    <Link underline="hover" fontFamily={"var(--font-poppins)"} color="#2998FF" href="/">
                        Home
                    </Link>
                    <Typography color="text.primary" fontFamily={"var(--font-poppins)"}>Searched Products</Typography>
                </Breadcrumbs>
            ): (
                <Breadcrumbs separator={<HiChevronRight className='text-slate-300 w-5 h-5' />}>
                    <Link underline="hover" fontFamily={"var(--font-poppins)"} color="#2998FF" href="/">
                        Home
                    </Link>
                    {
                        getCategoryNames(categoryTree[0]).map((category, i)=> (
                            <Link key={i} underline="hover" fontFamily={"var(--font-poppins)"} color="#2998FF" href={`/${formatCategoryParam({toPut : true, category : category.name})}`}>
                                { category.name }
                            </Link>
                        ))
                    }
                    {
                        from === "input" &&
                        <Typography color="text.primary" fontFamily={"var(--font-poppins)"}>Searched Products</Typography>
                    }
                </Breadcrumbs>
            )
        }
    </div>
  )
}
