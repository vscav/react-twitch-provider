import React, { useEffect } from 'react'
import { Greeting } from './components/info'
import { TwitchProvider } from './components/TwitchProvider'
import { TWITCH_CLIENT_ID, __test__ } from './constants'
import { getFirstMockedClient } from './utils/api'

type Credentials = {
  id?: string
  secret?: string
}

function App() {
  const [credentials, setCredentials] = React.useState<Credentials>({
    ...(!__test__ && { id: TWITCH_CLIENT_ID }),
  })

  useEffect(() => {
    const setMockedClientCredentials = async () => {
      const data = await getFirstMockedClient()

      setCredentials({
        id: data.id,
        secret: data.secret,
      })
    }

    if (__test__) setMockedClientCredentials()
  }, [])

  if (__test__ && (!credentials.id || !credentials.secret)) return null

  return (
    <TwitchProvider clientId={credentials.id || ''} clientSecret={credentials.secret}>
      <Greeting />
    </TwitchProvider>
  )
}

export default App
