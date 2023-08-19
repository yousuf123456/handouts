import React from 'react'
import { Layout } from '../../components/Layout'
import { Container } from '../../components/Container'
import { Heading } from '@/app/(site)/components/Heading';
import { CancellationDetails } from './components/CancellationDetails';

interface IParams {
    cancellationRequestId : string;
}

export default async function CancellationRequestDetailsPage({ params } : { params : IParams }){
  return (
    <Layout>
        <Container>
            <div className='flex flex-col gap-6'>
                <CancellationDetails 
                    cancellationRequestId={params.cancellationRequestId}
                />
            </div>
        </Container>
    </Layout>
  )
}
