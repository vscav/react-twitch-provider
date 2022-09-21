import React, { ReactNode, useEffect, useState } from 'react'
import { TwitchContext } from '../context/twitch-context'
import { getMockedAccessToken } from './api'

type TwitchProviderProps = {
  clientId: string
  clientSecret?: string
  children?: ReactNode
}

function throwOnInvalidClient(clientId: string) {
  const isClientIdValid = clientId || typeof clientId === 'string' || clientId['length']

  if (!isClientIdValid)
    throw new Error(
      'You need to provide an existing and valid Twitch client identifier to the provider. See https://dev.twitch.tv/docs/api/get-started#register-an-application for more information on how to register an application and obtain your Twitch client identifier.',
    )
}

function MockTwitchProvider({ clientId, clientSecret, children }: TwitchProviderProps) {
  throwOnInvalidClient(clientId)

  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    async function handleMockedToken() {
      const mockedAccessToken = await getMockedAccessToken({
        id: clientId,
        secret: clientSecret,
      })

      if (mockedAccessToken) setAccessToken(mockedAccessToken)
    }

    handleMockedToken()
  }, [clientId, clientSecret])

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

export { MockTwitchProvider }
