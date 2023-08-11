import React from 'react'
import { Profile } from './components/Profile'
import { getCurrentUser } from '@/app/actions/getCurrentUser'
import { Layout } from '../components/Layout';
import { Container } from '../components/Container';

export default async function page() {
  const user = await getCurrentUser() as any;
  
  return (
    <Layout>
      <Container>
        <Profile 
          user={user}
        />
      </Container>
    </Layout>
  )
}
