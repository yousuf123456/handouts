"use client"

import Pagination from '@mui/material/Pagination'
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface PaginationControlProps {
    pageNumber : number | undefined;
    lastOrderId : string | undefined;
    firstOrderId : string | undefined;
}

export const PaginationControl: React.FC<PaginationControlProps> = ({
    pageNumber,
    lastOrderId,
    firstOrderId
}) => {

    const [currentPage, setCurrentPage] = useState(pageNumber || 1);

    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (e:any, page: number)=>{
        if(currentPage === page) return

        const cursor = (page > currentPage) ? lastOrderId : firstOrderId
        router.push(`${pathname}?page=${page}&prevPage=${currentPage}&cursor=${cursor}`)

        setCurrentPage(page)
    }

  return (
    <div className='w-full flex justify-end'>
        <Pagination 
            count={10} 
            color='primary' 
            shape="rounded" 
            onChange={handleChange}
        />
    </div>
  )
}
