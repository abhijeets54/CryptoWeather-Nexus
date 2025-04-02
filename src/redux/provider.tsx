'use client'

import { Provider } from 'react-redux'
import { store } from './store'
import { useRef } from 'react'

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  // Use useRef to ensure the store is created only once
  const storeRef = useRef(store)
  
  return <Provider store={storeRef.current}>{children}</Provider>
}
