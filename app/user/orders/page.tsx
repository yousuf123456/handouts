
import React from 'react'

import { Container } from '../components/Container'
import { Layout } from '../components/Layout'
import { Orders } from './components/Orders'

interface SearchParams {
  page : string | undefined;
}

export default async function OrdersPage({ searchParams }: { searchParams : SearchParams }) {
  return (
    <Layout>
      <Container>
        <Orders 
          pageNumber={parseInt(searchParams.page || "0") || undefined}
        />
      </Container>
    </Layout>
  )
}
