import { TWITCH_INVALID_CLIENT_ID, TWITCH_INVALID_OAUTH_TOKEN } from './fixtures'

function isAccessTokenValid(accessToken: unknown) {
  return accessToken !== `Bearer ${TWITCH_INVALID_OAUTH_TOKEN}`
}

function isClientIdValid(clientId: unknown) {
  return clientId !== TWITCH_INVALID_CLIENT_ID
}

export { isAccessTokenValid, isClientIdValid }
