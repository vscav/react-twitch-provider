import React from 'react'
import { TwitchContext } from '../../lib/context/twitch-context'
import { TwitchProviderOptions, TwitchProviderProps } from '../../lib/context/twitch-provider'
import { throwOnInvalidClientIdentifier, throwOnInvalidRedirectUri } from '../../lib/utils/error'

type MockTwitchProviderOptions = TwitchProviderOptions & {
  accessToken: string
}

type MockTwitchProviderProps = MockTwitchProviderOptions & TwitchProviderProps

function MockTwitchProvider({ accessToken, clientId, redirectUri, children }: MockTwitchProviderProps) {
  throwOnInvalidClientIdentifier(clientId)
  throwOnInvalidRedirectUri(redirectUri)

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

export type { MockTwitchProviderOptions }
export { MockTwitchProvider }
