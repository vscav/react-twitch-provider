import type { CustomRequestInit } from '../types'

const REQUIRED_TWITCH_SCOPES = ['user:read:email']
const BASE_REDIRECT_PARAMETERS = {
  response_type: 'token',
  scope: REQUIRED_TWITCH_SCOPES.join(' '),
}

const REQUEST_INIT: CustomRequestInit = {
  method: 'get',
  mode: 'cors',
  cache: 'no-store',
}

const TOKEN_PARAM_IDENTIFIER = 'access_token'

const TWITCH_API_AUTHORIZATION_URL = 'https://id.twitch.tv/oauth2/authorize'
const TWITCH_API_BASE_URL = 'https://api.twitch.tv/helix'

const TWITCH_API_CHEERMOTES_ENDPOINT = 'bits/cheermotes'
const TWITCH_API_TOP_GAMES_ENDPOINT = `games/top`
const TWITCH_API_USERS_ENDPOINT = 'users'

export {
  BASE_REDIRECT_PARAMETERS,
  REQUEST_INIT,
  TOKEN_PARAM_IDENTIFIER,
  TWITCH_API_AUTHORIZATION_URL,
  TWITCH_API_BASE_URL,
  TWITCH_API_CHEERMOTES_ENDPOINT,
  TWITCH_API_TOP_GAMES_ENDPOINT,
  TWITCH_API_USERS_ENDPOINT,
}
