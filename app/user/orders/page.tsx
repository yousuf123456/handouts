
import React from 'react'
import { Container } from '../components/Container'
import { Layout } from '../components/Layout'
import { Orders } from './components/Orders'

export default async function OrdersPage() {
  return (
    <Layout>
      <Container>
        <Orders />
      </Container>
    </Layout>
  )
}
