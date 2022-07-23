import { z } from 'zod'
import { FetcherError } from '../utils/error'
import type { TwitchApiDataResponse } from './useTwitchApi'
import { useTwitchApi } from './useTwitchApi'

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

// To move away in a more global place of the code base
type TwitchHooksBaseReturn = {
  error?: FetcherError
  loading: boolean
}

type TwitchUserHookReturn = TwitchHooksBaseReturn & {
  data?: User
}

function safelyValidateUserData(maybeUserData: unknown) {
  const { success: isUserDataValid } = User.safeParse(maybeUserData)
  return isUserDataValid
}

/**
 * Retrieve the logged in user data from the Twitch API.
 * The response received can result in an error or the expected user data.
 * While the promise is not yet resolved, the hook will return a loading state set to `true`.
 *
 * The response is cached by default for 10 seconds.
 *
 * See the [Twitch API endpoint documentation](https://dev.twitch.tv/docs/api/reference#get-users) for more information.
 */
function useTwitchUser(): TwitchUserHookReturn {
  const { data, error, isValidating } = useTwitchApi<UsersApiResponse>(USERS_API_ENDPOINT)

  const loadingState = { loading: isValidating }

  const userData = data?.data[0]

  const isUserDataValid = safelyValidateUserData(userData)
  const needsDataValidation = !isValidating && !error

  const hasValidationError = needsDataValidation && !isUserDataValid

  if (hasValidationError) {
    // Use another type of error (other than the FetcherError) to be able to be more specific
    const validationError = new FetcherError(
      'Failed data validation',
      422,
      'The response received from the Twitch API does not respect the expected format for a user object. It might has been caused by breaking changes in the Twitch API that are not currently handled in the library.',
    )
    return {
      ...loadingState,
      error: validationError,
    }
  }

  return { ...loadingState, data: userData, error }
}

export { useTwitchUser }
