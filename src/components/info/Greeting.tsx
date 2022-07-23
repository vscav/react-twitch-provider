import React from 'react'
import { useTwitchUser } from '../../hooks'

function Greeting() {
  const { data, error, loading } = useTwitchUser()

  return (
    <p>
      {loading && <>Loading...</>}
      {error && <>An error occured - Message: {error.message ? error.message : 'No message'}</>}
      {data && <>Welcome {data.display_name}</>}
    </p>
  )
}

export { Greeting }
