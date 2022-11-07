import { TWITCH_API_CHEERMOTES_ENDPOINT, TWITCH_API_USERS_ENDPOINT } from '../../lib/constants'
import { createApiUrl } from '../../lib/utils'

const CHEERMOTES_PATH = createApiUrl(TWITCH_API_CHEERMOTES_ENDPOINT)
const USERS_PATH = createApiUrl(TWITCH_API_USERS_ENDPOINT)
const OTHER_PATH = createApiUrl('*')

export { CHEERMOTES_PATH, USERS_PATH, OTHER_PATH }
