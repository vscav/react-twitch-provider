import { TwitchContext } from '@context/twitch-context'
import React from 'react'

function useTwitchContext() {
  const context = React.useContext(TwitchContext)

  if (context === undefined) {
    throw new Error(
      'The TwitchProvider context is undefined. Verify that useTwitchContext() is being called as a child of a <TwitchProvider> component.',
    )
  }

  return context
}

export { useTwitchContext }
