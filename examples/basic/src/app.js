import React from 'react'
import { Greeting } from './components/greeting'
import TwitchProvider from 'react-twitch-provider'

export function App() {
  return (
    <TwitchProvider
      clientId={process.env.REACT_APP_TWITCH_CLIENT_ID}
      redirectUri={process.env.REACT_APP_TWITCH_REDIRECT_URI}
    >
      <Greeting />
    </TwitchProvider>
  )
}
