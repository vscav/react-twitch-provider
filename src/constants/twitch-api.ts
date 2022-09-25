const REQUIRED_TWITCH_SCOPES = ['user:read:email']
const BASE_REDIRECT_PARAMETERS = {
  response_type: 'token',
  scope: REQUIRED_TWITCH_SCOPES.join(' '),
}

const TOKEN_PARAM_IDENTIFIER = 'access_token'

const TWITCH_API_ENDPOINT = 'https://api.twitch.tv/helix/'
const TWITCH_CLIENT_ID = process.env.REACT_APP_TWITCH_CLIENT_ID || ''
const TWITCH_MOCK_API_ENDPOINT = '/mock/'

export {
  BASE_REDIRECT_PARAMETERS,
  TOKEN_PARAM_IDENTIFIER,
  TWITCH_API_ENDPOINT,
  TWITCH_CLIENT_ID,
  TWITCH_MOCK_API_ENDPOINT,
}
