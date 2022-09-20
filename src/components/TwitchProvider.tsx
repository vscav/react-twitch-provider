import React, { useEffect, useState } from 'react'
import { __test__ } from '../constants'
import { getMockedAccessToken, redirectForToken } from '../utils/api'
import { TwitchContext } from './TwitchContext'

type TwitchProviderProps = {
  clientId: string
  clientSecret?: string
  children?: React.ReactNode
}

function storeAccessTokenInSession(token: string) {
  sessionStorage.setItem('twitchAccessToken', token)
}

function getAccessTokenFromSession() {
  return sessionStorage.getItem('twitchAccessToken')
}

function throwOnInvalidClient(clientId: string) {
  const isClientIdValid = clientId || typeof clientId === 'string' || clientId['length']

  if (!isClientIdValid)
    throw new Error(
      'You need to provide an existing and valid Twitch client identifier to the provider. See https://dev.twitch.tv/docs/api/get-started#register-an-application for more information on how to register an application and obtain your Twitch client identifier.',
    )
}

function TwitchProvider({ clientId, clientSecret, children }: TwitchProviderProps) {
  throwOnInvalidClient(clientId)

  const [accessToken, setAccessToken] = useState<string | null>(__test__ ? null : getAccessTokenFromSession())

  useEffect(() => {
    __test__ ? handleMockedToken() : handleTokenFromQueryParams()
  }, [clientId, clientSecret])

  function handleTokenFromQueryParams() {
    const hashParameters = new URLSearchParams(document.location.hash.substring(1))
    const accessTokenAsQueryParameter = hashParameters.get('access_token')

    if (accessTokenAsQueryParameter) {
      storeAccessTokenInSession(accessTokenAsQueryParameter)
      setAccessToken(accessTokenAsQueryParameter)
    }
  }

  async function handleMockedToken() {
    const mockedAccessToken = await getMockedAccessToken({
      id: clientId,
      secret: clientSecret,
    })

    if (mockedAccessToken) setAccessToken(mockedAccessToken)
  }

  if (!accessToken) {
    !__test__ && redirectForToken(clientId)
    return null
  }

  return (
    <TwitchContext.Provider
      value={{
        accessToken: accessToken || '',
        clientId,
      }}
    >
      {children}
    </TwitchContext.Provider>
  )
}

export { TwitchProvider }
