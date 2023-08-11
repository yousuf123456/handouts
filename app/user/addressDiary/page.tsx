import React from 'react'
import { Layout } from '../components/Layout'
import { Container } from '../components/Container'
import { AddressDiary } from './components/AddressDiary'
import { getCurrentUser } from '@/app/actions/getCurrentUser'
import { ReduxProvider } from '@/app/context/ReduxProvider'

export default async function AddressDiaryPage() {  
  return (
    <Layout>
      <Container>
        <ReduxProvider>
          <AddressDiary />
        </ReduxProvider>
      </Container>
    </Layout>
  )
}
