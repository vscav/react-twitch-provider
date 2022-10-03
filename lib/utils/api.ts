import { BASE_REDIRECT_PARAMETERS } from '@/constants/twitch-api'

function redirectForToken(clientId: string, redirectUri: string) {
  const oauthParamaters = new URLSearchParams({
    ...BASE_REDIRECT_PARAMETERS,
    client_id: clientId,
    redirect_uri: redirectUri,
  })
  const oauthUrl = `https://id.twitch.tv/oauth2/authorize?${oauthParamaters}`

  window.location.replace(oauthUrl)
}

export { redirectForToken }
