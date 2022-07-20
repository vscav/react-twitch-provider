import React from 'react'
import { Greeting } from './components/info'
import { TwitchProvider } from './components/TwitchProvider'

function App() {
  return (
    <TwitchProvider>
      <Greeting />
    </TwitchProvider>
  )
}

export default App
