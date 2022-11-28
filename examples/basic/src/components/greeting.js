import React from 'react'
import { useTwitchCurrentUser } from 'react-twitch-provider'

function Greeting() {
  const { data, error, isLoading } = useTwitchCurrentUser()
  return (
    <p>
      {data && <>Welcome {data.display_name}</>}
      {error && (
        <>
          An error occured - {error.status} / {error.name} - Message: {error.message ? error.message : 'No message'}
        </>
      )}
      {isLoading && <>Loading...</>}
    </p>
  )
}

export { Greeting }
