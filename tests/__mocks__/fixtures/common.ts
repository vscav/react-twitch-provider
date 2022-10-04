const TWITCH_INVALID_CLIENT_ID = 'twitch-invalid-client-id'
const TWITCH_INVALID_OAUTH_TOKEN = 'twitch-invalid-oauth-token'

const TWITCH_INTERNAL_SERVER_ERROR_RESPONSE = {
  error: 'Internal Server Error',
  status: 500,
}

const TWITCH_UNNAUTHORIZED_BASE_RESPONSE = {
  error: 'Unauthorized',
  status: 401,
}

const TWITCH_INVALID_CLIENT_ID_RESPONSE = {
  ...TWITCH_UNNAUTHORIZED_BASE_RESPONSE,
  message: 'Client ID and OAuth token do not match',
}

const TWITCH_INVALID_OAUTH_TOKEN_RESPONSE = {
  ...TWITCH_UNNAUTHORIZED_BASE_RESPONSE,
  message: 'Invalid OAuth token',
}

export {
  TWITCH_INTERNAL_SERVER_ERROR_RESPONSE,
  TWITCH_INVALID_CLIENT_ID,
  TWITCH_INVALID_CLIENT_ID_RESPONSE,
  TWITCH_INVALID_OAUTH_TOKEN,
  TWITCH_INVALID_OAUTH_TOKEN_RESPONSE,
}