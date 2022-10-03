const TWITCH_INVALID_CLIENT_ID = 'twitch-invalid-client-id'
const TWITCH_INVALID_OAUTH_TOKEN = 'twitch-invalid-oauth-token'

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

const TWITCH_USER_DATA = {
  id: '123456789',
  login: 'twitchdev',
  display_name: 'TwitchDev',
  type: '',
  broadcaster_type: 'partner',
  description: 'TwitchDev channel.',
  profile_image_url:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/8a6381c7-d0c0-4576-b179-38bd5ce1d6af-profile_image-300x300.png',
  offline_image_url:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/3f13ab61-ec78-4fe6-8481-8682cb3b0ac2-channel_offline_image-1920x1080.png',
  view_count: 1000000,
  email: 'twitch-dev@gmail.com',
  created_at: '2022-10-03T20:32:28Z',
}

const TWITCH_USERS_DATA = [TWITCH_USER_DATA]

export {
  TWITCH_INVALID_CLIENT_ID,
  TWITCH_INVALID_CLIENT_ID_RESPONSE,
  TWITCH_INVALID_OAUTH_TOKEN,
  TWITCH_INVALID_OAUTH_TOKEN_RESPONSE,
  TWITCH_USER_DATA,
  TWITCH_USERS_DATA,
}
