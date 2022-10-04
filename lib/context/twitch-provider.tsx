import { TOKEN_PARAM_IDENTIFIER } from '../constants/twitch-api'
import { TwitchContext } from './twitch-context'
import { redirectForToken } from '../utils/api'
import { throwOnInvalidClientIdentifier, throwOnInvalidRedirectUri } from '../utils/error'
import React from 'react'

type TwitchProviderOptions = {
  clientId: string
  redirectUri: string
}

type TwitchProviderProps = TwitchProviderOptions & {
  children?: React.ReactNode
}

function TwitchProvider({ clientId, redirectUri, children }: TwitchProviderProps) {
  throwOnInvalidClientIdentifier(clientId)
  throwOnInvalidRedirectUri(redirectUri)

  const hashParameters = new URLSearchParams(document.location.hash.substring(1))
  const accessToken = hashParameters.get(TOKEN_PARAM_IDENTIFIER)

  if (!accessToken) {
    redirectForToken(clientId, redirectUri)
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

export type { TwitchProviderOptions, TwitchProviderProps }
export { TwitchProvider }
