import React from 'react'
import { Layout } from '../components/Layout'
import { Container } from '../components/Container'
import { Heading } from '@/app/(site)/components/Heading'
import { Returns } from './components/Returns'

interface SearchParams {
  page : string | undefined;
}

export default async function ReturnsPage({ searchParams } : { searchParams : SearchParams }) {

  return (
    <Layout>
      <Container>
        <Returns 
          pageNumber={parseInt(searchParams.page || "0")}
        />
      </Container>
    </Layout>
  )
}
