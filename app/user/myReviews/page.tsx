import React from 'react'
import { Layout } from '../components/Layout';
import { Container } from '../components/Container';
import { ToBeReviewedReviews } from './components/ToBeReviewedReviews';
import { HistoryReviews } from './components/HistoryReviews';
import { Heading } from '@/app/(site)/components/Heading';
import { ToggleBar } from './components/ToggleBar';

export const revalidate = 0;

interface SearchParams {
  isHistory : string;
  toBeReviewed : string;
  page : string | undefined;
}

export default async function MyReviewsPage({ searchParams } : { searchParams : SearchParams }) {

  const toBeReviewed = searchParams.toBeReviewed === "true";
  const history = searchParams.isHistory === "true";

  return (
    <Layout>
      <Container>
        <div className='h-full flex flex-col gap-6'>
          <ToggleBar />

          {
            toBeReviewed ? 
            <ToBeReviewedReviews 
              pageNumber={parseInt(searchParams.page || "0")}
            /> 
            : 
            <HistoryReviews 
              pageNumber={parseInt(searchParams.page || "0")}
            />
          }
        </div>
      </Container>
    </Layout>
  )
}
