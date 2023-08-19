import React from 'react'
import { Questions } from './components/Questions'
import { BreadCrumbs } from '@/app/user/orders/components/BreadCrumbs';

interface SearchParams {
    page? : string | undefined;
    cursor? : string | undefined;
    prevPage? : string | undefined;
}

interface IParams {
    productId : string;
}

export default async function ProductQuestionsPage({searchParams, params}: {searchParams: SearchParams, params : IParams}) {
  return (
    <div className='px-16 py-6 bg-white'>
        <Questions 
            productId={params.productId}
            cursor={searchParams.cursor}
            page={parseInt(searchParams.page || "0")}
            prevPage={parseInt(searchParams.prevPage || "0")}
        />
    </div>
  )
}
