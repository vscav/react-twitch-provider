import { BASE_REDIRECT_PARAMETERS, TWITCH_API_BASE_URL } from '../constants'
import { nullableString } from '../types'

function createApiUrl(endpoint: nullableString) {
  return `${TWITCH_API_BASE_URL}/${endpoint}`
}

function redirectForToken(clientId: string, redirectUri: string) {
  const oauthParamaters = new URLSearchParams({
    ...BASE_REDIRECT_PARAMETERS,
    client_id: clientId,
    redirect_uri: redirectUri,
  })
  const oauthUrl = `https://id.twitch.tv/oauth2/authorize?${oauthParamaters}`

  window.location.replace(oauthUrl)
}

export { createApiUrl, redirectForToken }
