import React from 'react'
import { Layout } from '../../components/Layout';
import { Container } from '../../components/Container';
import { OrderDetails } from './components/OrderDetails';
import { Heading } from '@/app/(site)/components/Heading';

interface IParams {
    orderId : string;
}

export default async function OrderDetailsPage(
    { params } : { params : IParams }
) {
  return (
    <Layout>
        <Container>
            <div className='flex flex-col gap-6'>
                <Heading>
                    Order Details
                </Heading>
                
                <OrderDetails 
                    orderId={params.orderId}
                />
            </div>
        </Container>
    </Layout>
  )
}
