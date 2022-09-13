const baseParameters = {
  redirect_uri: 'http://localhost:3000',
  response_type: 'token',
  scope: ['user:read:email'].join(' '),
}

const getFirstMockedClient = async () => {
  const clients = await fetch('/units/clients')
  const {
    data: [client],
  } = await clients.json()

  return { id: client.ID, secret: client.Secret }
}

// const getMockedAccessToken = async (mockedClient, mockedUserToAuthenticate) => {
//   const authorizationParameters = new URLSearchParams({
//     client_id: mockedClient.id,
//     client_secret: mockedClient.secret,
//     grant_type: 'user_token',
//     user_id: mockedUserToAuthenticate.id,
//     scope: ['user:read:email'].join(' '),
//   })

//   const authorizationResponse = await fetch(`/auth/authorize?${authorizationParameters}`, {
//     method: 'POST',
//   })
//   const { access_token: mockedAccessToken } = await authorizationResponse.json()
//   return mockedAccessToken
// }

const getMockedUserToAuthenticate = async () => {
  const users = await fetch('/units/users')
  const {
    data: [userToAuthenticate],
  } = await users.json()

  return userToAuthenticate
}

const redirectForToken = (clientId: string) => {
  const oauthParamaters = new URLSearchParams({
    ...baseParameters,
    client_id: clientId,
  })
  const oauthUrl = `https://id.twitch.tv/oauth2/authorize?${oauthParamaters}`

  window.location.replace(oauthUrl)
}

export { getFirstMockedClient, getMockedUserToAuthenticate, redirectForToken }
