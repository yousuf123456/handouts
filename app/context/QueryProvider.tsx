"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

interface QueryProviderProps {
    children : React.ReactNode
}

const client = new QueryClient();

export const QueryProvider: React.FC<QueryProviderProps> = ({
    children
}) => {
  return (
    <QueryClientProvider client={client}>
        { children }
    </QueryClientProvider>
  )
}
