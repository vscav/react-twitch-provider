import type { TwitchApiDataResponse, TwitchHookBaseReturn } from './use-twitch-api'
import { useTwitchApi } from './use-twitch-api'
import { UnexpectedTwitchDataError } from '../utils/error'
import { z } from 'zod'

const USERS_API_ENDPOINT = 'users'

const User = z.object({
  id: z.string(),
  login: z.string(),
  display_name: z.string(),
  type: z.string(),
  broadcaster_type: z.string(),
  description: z.string(),
  profile_image_url: z.string(),
  offline_image_url: z.string(),
  view_count: z.number(),
  email: z.string(),
  created_at: z.string(),
})

type User = z.infer<typeof User>

type Users = User[]

type UsersApiResponse = TwitchApiDataResponse<Users>

type TwitchUserHookReturn = TwitchHookBaseReturn & {
  data?: User
}

function safelyValidateUserData(maybeUserData: unknown) {
  const { success: isUserDataValid } = User.safeParse(maybeUserData)
  return isUserDataValid
}

/**
 * Retrieve the logged in user data from the Twitch API.
 * The response received can result in an error or the expected user data.
 * While the promise is not yet resolved, the hook will return a loading state.
 *
 * The response is cached by default for 10 seconds.
 *
 * See the [Twitch API endpoint documentation](https://dev.twitch.tv/docs/api/reference#get-users) for more information.
 */
function useTwitchUser(): TwitchUserHookReturn {
  const { data, error, isValidating } = useTwitchApi<UsersApiResponse>(USERS_API_ENDPOINT)

  const needsDataValidation = data && !isValidating && !error

  const loadingState = { loading: isValidating }

  const [userData] = data?.data || []

  const isUserDataValid = safelyValidateUserData(userData)

  if (needsDataValidation && !isUserDataValid) {
    return {
      ...loadingState,
      error: new UnexpectedTwitchDataError(),
    }
  }

  return { ...loadingState, data: userData, error }
}

export type { UsersApiResponse }
export { useTwitchUser }
