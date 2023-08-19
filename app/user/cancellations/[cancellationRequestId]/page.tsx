import React, { Suspense } from 'react'
import { Layout } from '../../components/Layout'
import { Container } from '../../components/Container'
import { Heading } from '@/app/(site)/components/Heading';
import { CancellationDetails } from './components/CancellationDetails';
import { SpinnerLoading } from '../../components/SpinnerLoading';

interface IParams {
    cancellationRequestId : string;
}

export default async function CancellationRequestDetailsPage({ params } : { params : IParams }){
  return (
    <Layout>
        <Container>
            <div className='h-full flex flex-col gap-6'>
                <Heading>
                    Cancellation Details
                </Heading>
                
                <Suspense fallback={<SpinnerLoading />}>
                    <CancellationDetails 
                        cancellationRequestId={params.cancellationRequestId}
                    />
                </Suspense>
            </div>
        </Container>
    </Layout>
  )
}
