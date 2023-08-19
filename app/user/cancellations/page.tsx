import React from 'react'
import { Container } from '../components/Container'
import { Layout } from '../components/Layout'
import { Cancellations } from './components/Cancellations'

interface SearchParams {
  page : string | undefined;
}

export default async function CancellationsPage ({ searchParams }: { searchParams : SearchParams }){
  return (
    <Layout>
      <Container>
        <Cancellations 
          pageNumber={parseInt(searchParams.page || "0")}
        />
      </Container>
    </Layout>
  )
}
