import { createContext, useContext } from 'react'

type TwitchContextData = {
  accessToken: string
  clientId: string
}

const TwitchContext = createContext<TwitchContextData | undefined>(undefined)

function useTwitchContext() {
  const context = useContext(TwitchContext)

  if (context === undefined) {
    // Adapt the error message to be more "user focused"
    throw new Error('useTwitchContext must be used within a TwitchProvider')
  }

  return context
}

export { TwitchContext, useTwitchContext }
