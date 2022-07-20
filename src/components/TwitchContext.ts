import { createContext, useContext } from 'react'

export type TwitchContextData = {
  accessToken: string
  clientId: string
}

export const TwitchContext = createContext<TwitchContextData | undefined>(undefined)

export function useTwitchContext() {
  const context = useContext(TwitchContext)

  if (context === undefined) {
    throw new Error('useTwitchContext must be used within a TwitchProvider')
  }

  return context
}
