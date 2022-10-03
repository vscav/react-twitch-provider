import React from 'react'
import { TwitchContext } from '../../lib/context/twitch-context'
import { TwitchProviderOptions, TwitchProviderProps } from '../../lib/context/twitch-provider'
import { throwOnInvalidClientIdentifier, throwOnInvalidRedirectUri } from '../../lib/utils/error'

type MockTwitchProviderOptions = TwitchProviderOptions

type MockTwitchProviderProps = MockTwitchProviderOptions & TwitchProviderProps

function MockTwitchProvider({ clientId, redirectUri, children }: MockTwitchProviderProps) {
  throwOnInvalidClientIdentifier(clientId)
  throwOnInvalidRedirectUri(redirectUri)

  const [accessToken] = React.useState<string>('bar')

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
