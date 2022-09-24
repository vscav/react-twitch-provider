import React from 'react'

type TwitchContextData = {
  accessToken: string
  clientId: string
}

const TwitchContext = React.createContext<TwitchContextData | undefined>(undefined)

function useTwitchContext() {
  const context = React.useContext(TwitchContext)

  if (context === undefined) {
    // Adapt the error message to be more "user focused"
    throw new Error('useTwitchContext must be used within a TwitchProvider')
  }

  return context
}

// We expose only one way to provide the context value and only one way to consume it.
// This allows to ensure that the context value will be used the way it should be.
export { TwitchContext, useTwitchContext }
