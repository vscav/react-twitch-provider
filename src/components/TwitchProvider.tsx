import React from 'react'
import { redirectForToken } from '../api/utils'
import { TwitchContext } from './TwitchContext'
import { TWITCH_CLIENT_ID } from '../constants'

type TwitchProviderProps = {
  children?: React.ReactNode
}

export function TwitchProvider({ children }: TwitchProviderProps) {
  if (!TWITCH_CLIENT_ID) throw new Error('You need to provide an existing Twitch client identifier')

  const hashParams = new URLSearchParams(document.location.hash.substr(1))
  const accessToken = hashParams.get('access_token')

  if (!accessToken) {
    redirectForToken()
    return null
  } else {
    console.log(`Access token (OAuth): ${accessToken}`)
  }

  return (
    <TwitchContext.Provider
      value={{
        accessToken,
        clientId: TWITCH_CLIENT_ID,
      }}
    >
      {children}
    </TwitchContext.Provider>
  )
}
