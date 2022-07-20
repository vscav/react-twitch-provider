import { useTwitchApi } from './useTwitchApi'

type User = {
  id: string
  login: string
  display_name: string
  type: string
  broadcaster_type: string
  description: string
  profile_image_url: string
  offline_image_url: string
  view_count: number
  email: string
  created_at: string
}

type UsersResponse = {
  data: User[]
}

type TwitchUserHookReturn = {
  data: User | undefined
  error: Error | undefined
  loading: boolean
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
export function useTwitchUser(): TwitchUserHookReturn {
  const path = 'users'

  const { data, error } = useTwitchApi<UsersResponse>(path)
  const isLoading = !data && !error

  return { data: data?.data[0], error, loading: isLoading }
}
