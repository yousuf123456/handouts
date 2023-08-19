import React, { Suspense } from 'react'
import { Container } from '../components/Container'
import { Layout } from '../components/Layout'
import { Cancellations } from './components/Cancellations'
import { Loading } from '../components/Loading';

interface SearchParams {
  page : string | undefined;
}

export default async function CancellationsPage ({ searchParams }: { searchParams : SearchParams }){
  return (
    <Layout>
      <Container>
        <Suspense fallback={<Loading heading='My Cancellations'/>}>
          <Cancellations 
            pageNumber={parseInt(searchParams.page || "0")}
          />
        </Suspense>
      </Container>
    </Layout>
  )
}
