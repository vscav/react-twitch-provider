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

const UNEXPECTED_TWITCH_USER_DATA = {
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
  created_at: '2022-10-03T20:32:28Z',
}

const TWITCH_USERS_DATA = [TWITCH_USER_DATA]
const UNEXPECTED_TWITCH_USERS_DATA = [UNEXPECTED_TWITCH_USER_DATA]

export { TWITCH_USER_DATA, TWITCH_USERS_DATA, UNEXPECTED_TWITCH_USER_DATA, UNEXPECTED_TWITCH_USERS_DATA }
