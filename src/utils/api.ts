const BASE_REDIRECT_PARAMETERS = {
  redirect_uri: 'http://localhost:3000',
  response_type: 'token',
  scope: ['user:read:email'].join(' '),
}

function redirectForToken(clientId: string) {
  const oauthParamaters = new URLSearchParams({
    ...BASE_REDIRECT_PARAMETERS,
    client_id: clientId,
  })
  const oauthUrl = `https://id.twitch.tv/oauth2/authorize?${oauthParamaters}`

  window.location.replace(oauthUrl)
}

export { redirectForToken }
