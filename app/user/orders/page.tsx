
import React from 'react'

import { Container } from '../components/Container'
import { Layout } from '../components/Layout'
import { Orders } from './components/Orders'

interface SearchParams {
  page : string | undefined;
  cursor : string | undefined;
  prevPage : string | undefined;
}

export default async function OrdersPage({ searchParams }: { searchParams : SearchParams }) {
  return (
    <Layout>
      <Container>
        <Orders 
          cursor={searchParams.cursor}
          prevPage={parseInt(searchParams.prevPage || "0") || undefined}
          pageNumber={parseInt(searchParams.page || "0") || undefined}
        />
      </Container>
    </Layout>
  )
}
