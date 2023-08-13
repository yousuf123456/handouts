import React, { Suspense } from 'react'

import { Container } from './components/Container'
import { Information } from './components/containers/Information'
import { Reviews } from './components/containers/Reviews'
import { Questions } from './components/containers/Questions'
import { Details } from "./components/containers/Details"
import { InformationLoading } from './components/containers/loadings/InformationLoading'
import { ReviewsLoading } from './components/containers/loadings/ReviewsLoading'
import { QuestionsLoading } from './components/containers/loadings/QuestionsLoading'
import { DetailsLoading } from './components/containers/loadings/DetailsLoading'
import { ProductsFromStore } from './components/containers/ProductsFromStore'
import { ProductsFromStoreLoading } from './components/containers/loadings/ProductsFromStoreLoading'
import { SimilarProducts } from './components/containers/SimilarProducts'
import { SimilarProductsLoading } from './components/containers/loadings/SimilarProductsLoading'

interface IParams {
  productId : string
}

export default async function page({ params } : { params : IParams }) {

  return (
    <div className='py-8 px-20 mt-8 w-full bg-slate-100'>
      <div className='flex flex-col gap-6'>
        <Suspense fallback={<InformationLoading />}>
          <Information productId={params.productId}/>
        </Suspense>

        <div className='flex items-start gap-6'>
          <div className='flex flex-col gap-6'>
            <Container>
              <Suspense fallback={<DetailsLoading />}>
                <Details productId={params.productId}/>
              </Suspense>
            </Container>

            <Container>
              <Suspense fallback={<ReviewsLoading />}>
                <Reviews productId={params.productId}/>
              </Suspense>
            </Container>

            <Container>
              <Suspense fallback={<QuestionsLoading />}> 
                <Questions productId={params.productId}/>
              </Suspense>
            </Container>

            <Suspense fallback={<SimilarProductsLoading />}>
              <SimilarProducts productId={params.productId}/>
            </Suspense>
          </div>

          <Suspense fallback={<ProductsFromStoreLoading />}>
            <ProductsFromStore productId={params.productId}/>
          </Suspense>
        </div>
      </div> 
    </div>
  )
}
