export const TWITCH_API_ENDPOINT = 'https://api.twitch.tv/helix/'
export const TWITCH_MOCK_API_ENDPOINT = '/mock/'
export const TWITCH_CLIENT_ID = process.env.REACT_APP_TWITCH_CLIENT_ID || ''

export const __test__ = process.env.NODE_ENV === 'test'
