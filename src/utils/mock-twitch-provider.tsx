import React from 'react'
import { TwitchContext } from '../context/twitch-context'
import { getMockedAccessToken } from './mock-api'

type MockTwitchProviderOptions = {
  clientId: string
  clientSecret: string
  token?: string
}

type MockTwitchProviderProps = MockTwitchProviderOptions & {
  children?: React.ReactNode
}

function throwOnInvalidClientIdentifier(clientId: string) {
  const isClientIdValid = clientId && typeof clientId === 'string' && clientId['length']

  if (!isClientIdValid)
    throw new Error(
      'You need to provide an existing and valid Twitch client identifier to the provider. See https://dev.twitch.tv/docs/api/get-started#register-an-application for more information on how to register an application and obtain your Twitch client identifier.',
    )
}

function MockTwitchProvider({ clientId, clientSecret, token, children }: MockTwitchProviderProps) {
  throwOnInvalidClientIdentifier(clientId)

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
