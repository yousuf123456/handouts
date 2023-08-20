"use client"
import { formatCategoryParam } from '@/app/utils/formatCategoryParam'
import { getCategoryNames } from '@/app/utils/getCategoryNames'
import { useParams, useSearchParams } from 'next/navigation'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import React from 'react'
import { HiChevronRight } from 'react-icons/hi2'
import clsx from 'clsx'

interface CategoryBreadCrumbsProps {
    categoryTree : any,
    crumbColor? : string;
    productName? : string;
    seperatorColor? : string;
}

export const CategoryBreadCrumbs: React.FC<CategoryBreadCrumbsProps> = ({
    seperatorColor,
    categoryTree,
    productName,
    crumbColor
}) => {

    const from = useSearchParams().get("from");
    const category = useParams().category

    const color = crumbColor || "#2998FF"

    const typoGraphyColor = "#737373"

    const seperatorCs = clsx('w-4 h-4', seperatorColor || "text-slate-500") 

  return (
    <div>
        {
            categoryTree === null ? (
                <Breadcrumbs separator={<HiChevronRight className={seperatorCs}/>}
                 aria-label="breadcrumb">
                    <Link underline="hover" fontFamily={"var(--font-poppins)"} color={color} href="/">
                        Home
                    </Link>
                    <Typography color={typoGraphyColor} fontFamily={"var(--font-poppins)"}>Searched Products</Typography>
                </Breadcrumbs>
            ): (
                <Breadcrumbs separator={<HiChevronRight className={seperatorCs} />}>
                    {
                        category &&
                        <Link underline="hover" fontFamily={"var(--font-poppins)"} color={color} href="/">
                            Home
                        </Link>
                    }
                    {
                        //Here category tree might be an array of array of categoryTreeData
                        getCategoryNames(categoryTree[0] || categoryTree).map((category, i)=> (
                            <Link 
                                key={i} 
                                color={color} 
                                underline="hover" 
                                fontFamily={"var(--font-poppins)"} 
                                href={`/${formatCategoryParam({toPut : true, category : category.name})}`}
                            >
                                { category.name }
                            </Link>
                        ))
                    }
                    {
                        from === "input" &&
                        <Typography color={typoGraphyColor} fontFamily={"var(--font-poppins)"}>Searched Products</Typography>
                    }
                    {
                        productName &&
                        <Typography color="#64748b" fontFamily={"var(--font-poppins)"}>{ productName }</Typography>     
                    }
                </Breadcrumbs>
            )
        }
    </div>
  )
}
