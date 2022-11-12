import React from 'react'

type TwitchContextProps = {
  accessToken: string
  clientId: string
}

/**
 * Context for the Twitch API. It provides the access token and client ID.
 */
const TwitchContext = React.createContext<TwitchContextProps | undefined>(undefined)

export type { TwitchContextProps }
export { TwitchContext }
