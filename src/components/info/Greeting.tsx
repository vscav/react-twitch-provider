import React from 'react'
import { useTwitchUser } from '../../hooks'

export function Greeting() {
  const { data, error, loading } = useTwitchUser()

  return (
    <p>
      {loading && <>Loading...</>}
      {error && <>An error occured - Details: {error.message}</>}
      {data && <>Welcome {data.display_name}</>}
    </p>
  )
}
