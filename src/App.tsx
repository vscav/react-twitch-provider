import React from 'react'
import { Greeting } from './components/info'
import { TWITCH_CLIENT_ID } from './constants/twitch-api'
import { TwitchProvider } from './context/twitch-provider'

function App() {
  return (
    <TwitchProvider clientId={TWITCH_CLIENT_ID || ''} redirectUri='http://localhost:3000'>
      <Greeting />
    </TwitchProvider>
  )
}

export default App
