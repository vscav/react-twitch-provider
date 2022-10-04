const REQUIRED_TWITCH_SCOPES = ['user:read:email']
const BASE_REDIRECT_PARAMETERS = {
  response_type: 'token',
  scope: REQUIRED_TWITCH_SCOPES.join(' '),
}

const TOKEN_PARAM_IDENTIFIER = 'access_token'

const TWITCH_API_BASE_URL = 'https://api.twitch.tv/helix'
const TWITCH_API_USERS_ENDPOINT = 'users'

export { BASE_REDIRECT_PARAMETERS, TOKEN_PARAM_IDENTIFIER, TWITCH_API_BASE_URL, TWITCH_API_USERS_ENDPOINT }
