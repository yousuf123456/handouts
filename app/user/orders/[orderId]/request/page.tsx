import React from 'react'

import { Heading } from '@/app/(site)/components/Heading'
import { Container } from '@/app/user/components/Container'
import { Layout } from '@/app/user/components/Layout'
import { OrderCancellationForm } from './components/OrderCancellationForm'


interface SearchParams {
    type : "Cancellation" | "Return"
}

interface IParams {
    orderId : string
}

export default async function RequestPage ({ searchParams, params } : { searchParams : SearchParams, params : IParams }) {
  return (
    <Layout>
        <Container>
            <div className='flex flex-col gap-6'>
                <Heading>
                    { searchParams.type === "Cancellation" ? "Cancellation Request" : "Return Request"}
                </Heading>

                <OrderCancellationForm
                    type={searchParams.type}
                    orderId={params.orderId}
                />
            </div>
        </Container>
    </Layout>
  )
}
