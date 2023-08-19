import React, { Suspense } from 'react'

import { Layout } from '../../components/Layout';
import { Container } from '../../components/Container';
import { Heading } from '@/app/(site)/components/Heading';
import { SpinnerLoading } from '../../components/SpinnerLoading';
import { OrderDetails } from './components/OrderDetails';

interface IParams {
    orderId : string;
}

export default async function OrderDetailsPage(
    { params } : { params : IParams }
) {
  return (
    <Layout>
        <Container>
            <div className='h-full flex flex-col gap-6'>
                <Heading>
                    Order Details
                </Heading>

                <Suspense fallback={<SpinnerLoading />}>
                    <OrderDetails 
                        orderId={params.orderId}
                    />
                </Suspense>
            </div>
        </Container>
    </Layout>
  )
}
