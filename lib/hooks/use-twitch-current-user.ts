import { ENTITY_IDENTIFIER, TWITCH_API_USERS_ENDPOINT } from '../constants'
import type { TwitchUserHookReturn, UsersApiResponse } from '../types'
import { safelyValidateUserData, UnexpectedTwitchDataError } from '../utils'
import { useTwitchApi } from './use-twitch-api'

/**
 * Retrieves the current logged in user data from the Twitch API.
 *
 * See the [Twitch API endpoint documentation](https://dev.twitch.tv/docs/api/reference#get-users) for more information.
 *
 * @returns {TwitchUserHookReturn}
 */
function useTwitchCurrentUser(): TwitchUserHookReturn {
  const { data, error, isValidating } = useTwitchApi<UsersApiResponse>(TWITCH_API_USERS_ENDPOINT)

  const needsDataValidation = data && !isValidating && !error
  const isLoading = !error && !data

  const [currentUser] = data?.data || []

  if (needsDataValidation) {
    const isUserDataValid = safelyValidateUserData(currentUser)
    if (!isUserDataValid) {
      return {
        error: new UnexpectedTwitchDataError(ENTITY_IDENTIFIER.USER),
        isValidating,
        isLoading,
      }
    }
  }

  return { data: currentUser, error, isValidating, isLoading }
}

export { useTwitchCurrentUser }
