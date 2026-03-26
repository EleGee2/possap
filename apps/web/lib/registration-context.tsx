'use client'

import { createContext, useContext, useState } from 'react'

export type LookupStatus = 'idle' | 'loading' | 'success' | 'error'

interface RegistrationState {
  // Step 1 — Personal Information
  idType: string
  idNumber: string
  lookupStatus: LookupStatus
  firstName: string
  lastName: string
  dob: string
  gender: string
  phone: string
  email: string
  residentialState: string
  lga: string
  address: string
  // Step 2 — Password Creation
  password: string
  termsAccepted: boolean
}

interface RegistrationContextValue {
  state: RegistrationState
  update: (partial: Partial<RegistrationState>) => void
}

const INITIAL_STATE: RegistrationState = {
  idType: '',
  idNumber: '',
  lookupStatus: 'idle',
  firstName: '',
  lastName: '',
  dob: '',
  gender: '',
  phone: '',
  email: '',
  residentialState: '',
  lga: '',
  address: '',
  password: '',
  termsAccepted: false,
}

const RegistrationContext = createContext<RegistrationContextValue | null>(null)

export function RegistrationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RegistrationState>(INITIAL_STATE)

  const update = (partial: Partial<RegistrationState>) =>
    setState(prev => ({ ...prev, ...partial }))

  return (
    <RegistrationContext.Provider value={{ state, update }}>
      {children}
    </RegistrationContext.Provider>
  )
}

export function useRegistration(): RegistrationContextValue {
  const ctx = useContext(RegistrationContext)
  if (!ctx) throw new Error('useRegistration must be used within RegistrationProvider')
  return ctx
}
