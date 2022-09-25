import React from 'react'

type TwitchContextProps = {
  accessToken: string
  clientId: string
}

const TwitchContext = React.createContext<TwitchContextProps | undefined>(undefined)

export type { TwitchContextProps }
// TODO: we should only expose one way to provide the context value and only one way to consume it.
// This would allow to ensure that the context value will be used the way it should be.
export { TwitchContext }
