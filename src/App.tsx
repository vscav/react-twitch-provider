import React from 'react'
import { Greeting } from './components/info'
import { TwitchProvider } from './components/TwitchProvider'
import { TWITCH_CLIENT_ID } from './constants'

function App() {
  return (
    <TwitchProvider clientId={TWITCH_CLIENT_ID || ''}>
      <Greeting />
    </TwitchProvider>
  )
}

export default App
