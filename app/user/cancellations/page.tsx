import React from 'react'
import { Container } from '../components/Container'
import { Layout } from '../components/Layout'
import { Heading } from '@/app/(site)/components/Heading'
import { Cancellations } from './components/Cancellations'

export default async function CancellationsPage (){
  return (
    <Layout>
      <Container>
        <div className='flex flex-col gap-6'>
          <Heading>
            Cancellations
          </Heading>

          <Cancellations />
        </div>
      </Container>
    </Layout>
  )
}
