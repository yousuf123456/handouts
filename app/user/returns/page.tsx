import React from 'react'
import { Layout } from '../components/Layout'
import { Container } from '../components/Container'
import { Heading } from '@/app/(site)/components/Heading'
import { Returns } from './components/Returns'

export default async function ReturnsPage() {
  return (
    <Layout>
        <Container>
            <div className='flex flex-col gap-6'>
                <Heading>
                    Returns
                </Heading>

                <Returns />
            </div>
        </Container>
    </Layout>
  )
}
