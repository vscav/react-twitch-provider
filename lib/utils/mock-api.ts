import { generateError } from './error'

type TwitchClient = {
  id: string
  secret: string
}

async function getMockedClient() {
  const clients = await fetch('/units/clients')
  const {
    data: [client],
  } = await clients.json()

  return { id: client.ID, secret: client.Secret }
}

async function getMockedAccessToken(mockedClient: TwitchClient) {
  const mockedUserToAuthenticate = await getMockedUserToAuthenticate()

  const authorizationParameters = new URLSearchParams({
    client_id: mockedClient.id,
    client_secret: mockedClient.secret,
    grant_type: 'user_token',
    user_id: mockedUserToAuthenticate.id,
    scope: ['user:read:email'].join(' '),
  })

  const authorizationResponse = await fetch(`/auth/authorize?${authorizationParameters}`, {
    method: 'POST',
  })

  if (!authorizationResponse.ok) throw await generateError(authorizationResponse)

  const { access_token: mockedAccessToken } = await authorizationResponse.json()

  return mockedAccessToken
}

async function getMockedUserToAuthenticate() {
  const users = await fetch('/units/users')
  const {
    data: [userToAuthenticate],
  } = await users.json()

  return userToAuthenticate
}

export { getMockedAccessToken, getMockedClient, getMockedUserToAuthenticate }
