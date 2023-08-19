import React, { Suspense } from 'react'
import { Layout } from '../../components/Layout';
import { Container } from '../../components/Container';
import { WriteReview } from './components/WriteReview';
import { Heading } from '@/app/(site)/components/Heading';
import { SpinnerLoading } from '../../components/SpinnerLoading';

export const revalidate = 0;

interface SearchParams {
  reviewId? : string;
  productId? : string;
  isHistory? : string;
  orderedProductId? : string;
}

export default async function WriteReviewPage ({ searchParams }: { searchParams : SearchParams }){

  return (
    <Layout>
      <Container>
        <div className='h-full flex flex-col gap-6'>
          <Heading>
            Write Review
          </Heading>

          <Suspense fallback={<SpinnerLoading />}>
            <WriteReview 
              searchParams={searchParams}
            />
          </Suspense>
        </div>
      </Container>
    </Layout>
  )
}
