"use client"

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ToasterContext } from './ToasterContext'

interface SessionProviderContextProps {
    children : React.ReactNode
}

export const SessionProviderContext: React.FC<SessionProviderContextProps> = ({ children }) => {
  return (
    <SessionProvider>
      <ToasterContext />
      { children }
    </SessionProvider>
  )
}
