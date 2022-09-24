const baseParameters = {
  redirect_uri: 'http://localhost:3000',
  response_type: 'token',
  scope: ['user:read:email'].join(' '),
}

const redirectForToken = (clientId: string) => {
  const oauthParamaters = new URLSearchParams({
    ...baseParameters,
    client_id: clientId,
  })
  const oauthUrl = `https://id.twitch.tv/oauth2/authorize?${oauthParamaters}`

  window.location.replace(oauthUrl)
}

export { redirectForToken }
