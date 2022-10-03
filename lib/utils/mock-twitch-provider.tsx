import React from 'react'
import { TwitchContext } from '../context/twitch-context'
import { TwitchProviderOptions, TwitchProviderProps } from '../context/twitch-provider'
import { throwOnInvalidClientIdentifier, throwOnInvalidRedirectUri } from './error'
import { getMockedAccessToken } from './mock-api'

type MockTwitchProviderOptions = TwitchProviderOptions & {
  clientSecret: string
  token?: string
}

type MockTwitchProviderProps = MockTwitchProviderOptions & TwitchProviderProps

function MockTwitchProvider({ clientId, clientSecret, redirectUri, token, children }: MockTwitchProviderProps) {
  throwOnInvalidClientIdentifier(clientId)
  throwOnInvalidRedirectUri(redirectUri)

  const [accessToken, setAccessToken] = React.useState<string | null>(null)

  const handleMockedToken = React.useCallback(async () => {
    const mockedAccessToken = await getMockedAccessToken({
      id: clientId,
      secret: clientSecret,
    })

    setAccessToken(token ? token : mockedAccessToken)
  }, [clientId, clientSecret, token])

  React.useEffect(() => {
    handleMockedToken()
  }, [handleMockedToken])

  if (!accessToken) return null

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
