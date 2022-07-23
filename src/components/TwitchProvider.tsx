import React from 'react'
import { redirectForToken } from '../utils/api'
import { TwitchContext } from './TwitchContext'

type TwitchProviderProps = {
  clientId: string
  children?: React.ReactNode
}

function throwOnInvalidClient(clientId: string) {
  const isClientIdInvalid = !clientId || typeof clientId !== 'string' || !clientId.length

  if (isClientIdInvalid) {
    throw new Error(
      'You need to provide an existing and valid Twitch client identifier to the provider. See https://dev.twitch.tv/docs/api/get-started#register-an-application for more information on how to register an application and obtain your Twitch client identifier.',
    )
  }
}

function TwitchProvider({ clientId, children }: TwitchProviderProps) {
  throwOnInvalidClient(clientId)

  const hashParameters = new URLSearchParams(document.location.hash.substring(1))
  const accessToken = hashParameters.get('access_token')

  if (!accessToken) {
    redirectForToken(clientId)
    return null
  } else {
    console.log(`Access token (OAuth): ${accessToken}`)
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
