import { z } from 'zod'
import type { FetcherError } from '../utils/error'
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

// To move away i a more global place of the code base
type TwitchHooksBaseReturn = {
  error: FetcherError | undefined
  loading: boolean
}

type TwitchUserHookReturn = TwitchHooksBaseReturn & {
  data: User | undefined
}

/**
 * Retrieve the logged in user data from the Twitch API.
 * The response received from the hook can result in an error or the expected user data.
 * While the promise is not yet resolved, the hook will return a loading state set to `true`.
 *
 * The response is cached by default for 10 seconds.
 *
 * Twitch documentation: https://dev.twitch.tv/docs/api/reference#get-users
 *
 */
function useTwitchUser(): TwitchUserHookReturn {
  const { data, error, isValidating } = useTwitchApi<UsersApiResponse>(USERS_API_ENDPOINT)

  return { data: data?.data[0], error, loading: isValidating }
}

export { useTwitchUser }
