import React from 'react'
import { redirectForToken } from '../utils/api'
import { throwOnInvalidClientIdentifier } from '../utils/error'
import { TwitchContext } from './twitch-context'

const TOKEN_PARAM_IDENTIFIER = 'access_token'

type TwitchProviderOptions = {
  clientId: string
}

type TwitchProviderProps = TwitchProviderOptions & {
  children?: React.ReactNode
}

function TwitchProvider({ clientId, children }: TwitchProviderProps) {
  throwOnInvalidClientIdentifier(clientId)

  const hashParameters = new URLSearchParams(document.location.hash.substring(1))
  const accessToken = hashParameters.get(TOKEN_PARAM_IDENTIFIER)

  if (!accessToken) {
    redirectForToken(clientId)
    return null
  }

  return (
    <TwitchContext.Provider
      value={{
        accessToken,
        clientId,
      }}
    >
      {children}
    </TwitchContext.Provider>
  )
}

export type { TwitchProviderOptions }
export { TwitchProvider }
