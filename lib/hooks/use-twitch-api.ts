import type { Fetcher } from 'swr'
import useSWR from 'swr'
import { REQUEST_INIT, TWITCH_API_BASE_URL } from '../constants'
import { useTwitchContext } from '../context'
import type { nullableString, TwitchHookFetcherReturn } from '../types'
import { FetcherError, generateError } from '../utils'

/**
 * The fetcher method used to perform `GET` requests on the Twitch API.
 *
 * @param {String} url The URL to fetch
 * @param {HeadersInit} headers The headers to send with the request
 * @returns {Promise<FetcherResponse>} The response data
 */
async function twitchApiFetcher<FetcherResponse>(url: string, headers: HeadersInit): Promise<FetcherResponse> {
  const response = await fetch(url, { ...REQUEST_INIT, headers })
  if (!response.ok) throw await generateError(response)

  return response.json()
}

/**
 * Hook that acts as a wrapper around the `useSWR` to perform `GET` requests on the Twitch API.
 * It prepares the request headers by adding credentials in order to authorize the user.
 *
 * @param {string|null} endpoint The Twitch API endpoint to access/fetch
 * @returns {TwitchHookFetcherReturn}
 */
function useTwitchApi<EntityDataType>(endpoint: nullableString): TwitchHookFetcherReturn<EntityDataType> {
  const { accessToken, clientId } = useTwitchContext()

  const path = `${TWITCH_API_BASE_URL}/${endpoint}`
  const headers = {
    'client-id': clientId,
    authorization: `Bearer ${accessToken}`,
  }

  const fetcher: Fetcher<EntityDataType, string> = () => twitchApiFetcher<EntityDataType>(path, headers)

  return useSWR<EntityDataType, FetcherError>(() => (endpoint ? path : null), fetcher, {
    shouldRetryOnError: false,
    refreshInterval: 10000,
  })
}

export { useTwitchApi }
