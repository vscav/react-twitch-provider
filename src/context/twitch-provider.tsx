import React, { ReactNode } from 'react'
import { redirectForToken } from '../utils/api'
import { TwitchContext } from './twitch-context'

const TOKEN_PARAM_IDENTIFIER = 'access_token'

type TwitchProviderProps = {
  clientId: string
  children?: ReactNode
}

function throwOnInvalidClient(clientId: string) {
  const isClientIdValid = clientId || typeof clientId === 'string' || clientId['length']

  if (!isClientIdValid)
    throw new Error(
      'You need to provide an existing and valid Twitch client identifier to the provider. See https://dev.twitch.tv/docs/api/get-started#register-an-application for more information on how to register an application and obtain your Twitch client identifier.',
    )
}

function TwitchProvider({ clientId, children }: TwitchProviderProps) {
  throwOnInvalidClient(clientId)

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

export { TwitchProvider }
