import React from 'react'
import { Layout } from '../../components/Layout';
import { Container } from '../../components/Container';
import { WriteReview } from './components/WriteReview';
import { Heading } from '@/app/(site)/components/Heading';

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
        <div className='flex flex-col gap-6'>
          <Heading>
            Write Review
          </Heading>

          <WriteReview 
            searchParams={searchParams}
          />
        </div>
      </Container>
    </Layout>
  )
}
