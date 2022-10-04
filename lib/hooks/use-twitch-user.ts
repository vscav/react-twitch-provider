import { z } from 'zod'
import { TWITCH_API_USERS_ENDPOINT } from '../constants/twitch-api'
import { UnexpectedTwitchDataError } from '../utils/error'
import type { TwitchApiDataResponse, TwitchHookBaseReturn } from './use-twitch-api'
import { useTwitchApi } from './use-twitch-api'

const User = z.object({
  /**
   * User’s ID.
   */
  id: z.string(),

  /**
   * User’s login name.
   */
  login: z.string(),

  /**
   * User’s display name.
   */
  display_name: z.string(),

  /**
   * User’s type: "staff", "admin", "global_mod", or "".
   */
  type: z.enum(['staff', 'admin', 'global_mod', '']),

  /**
   * The user’s broadcaster type: "partner", "affiliate", or "".
   */
  broadcaster_type: z.enum(['partner', 'affiliate', '']),

  /**
   * User’s channel description.
   */
  description: z.string(),

  /**
   * URL of the user’s profile image.
   */
  profile_image_url: z.string(),

  /**
   * URL of the user’s offline image.
   */
  offline_image_url: z.string(),

  /**
   * Total number of views of the user’s channel.
   */
  view_count: z.number(),

  /**
   * User’s verified email address
   */
  email: z.string(),

  /**
   * Date when the user was created.
   */
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
  const { data, error, isValidating } = useTwitchApi<UsersApiResponse>(TWITCH_API_USERS_ENDPOINT)

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
