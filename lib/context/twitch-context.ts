import React from 'react'

type TwitchContextProps = {
  accessToken: string
  clientId: string
}

const TwitchContext = React.createContext<TwitchContextProps | undefined>(undefined)

export type { TwitchContextProps }
export { TwitchContext }
