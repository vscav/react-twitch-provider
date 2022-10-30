import React from 'react'
import { TwitchContext } from '../../lib/context/twitch-context'
import { TwitchProviderOptions, TwitchProviderProps } from '../../lib/context/twitch-provider'
import { throwOnInvalidClientIdentifier, throwOnInvalidRedirectUri } from '../../lib/utils'
import * as apiUtilsModule from '../../lib/utils/api'

const redirectForToken = jest.spyOn(apiUtilsModule, 'redirectForToken').mockImplementation()

type MockTwitchProviderOptions = TwitchProviderOptions & {
  accessToken: string
}

type MockTwitchProviderProps = MockTwitchProviderOptions & TwitchProviderProps

function MockTwitchProvider({ accessToken, clientId, redirectUri, children }: MockTwitchProviderProps) {
  throwOnInvalidClientIdentifier(clientId)
  throwOnInvalidRedirectUri(redirectUri)

  if (!accessToken) {
    apiUtilsModule.redirectForToken(clientId, redirectUri)
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

export type { MockTwitchProviderOptions }
export { MockTwitchProvider, redirectForToken }
