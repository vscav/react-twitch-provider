import React from 'react'
import { useTwitchUser } from '../../hooks'

function Greeting() {
  const { data, error } = useTwitchUser()

  return (
    <p>
      {error && <>An error occured - Message: {error.message ? error.message : 'No message'}</>}
      {!data && !error && <>Loading...</>}
      {data && <>Welcome {data.display_name}</>}
    </p>
  )
}

export { Greeting }
