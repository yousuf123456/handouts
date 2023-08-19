import React from 'react'
import { Reviews } from './components/Reviews';

interface IParams {
  productId : string;
}

interface SearchParams {
  page : string | undefined;
  cursor : string | undefined;
  filter : string | undefined;
  sortBy : "rating" | undefined;
  prevPage : string | undefined;
  tieBreaker : string | undefined;
  direction : "desc" | "asc" | undefined;
}

export default async function CustomerReviewsPage({params, searchParams} : {params : IParams, searchParams : SearchParams}) {
  return (
    <div className='px-16 py-6 bg-white'>
      <Reviews
        cursor={searchParams.cursor}
        productId={params.productId}
        sortBy={searchParams.sortBy}
        filter={searchParams.filter}
        direction={searchParams.direction}
        tieBreaker={searchParams.tieBreaker}
        pageNumber={parseInt(searchParams.page || "0")}
        prevPage={parseInt(searchParams.prevPage || "0")}
      />
    </div>
  )
}
