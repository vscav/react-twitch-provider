import type { Fetcher } from 'swr'
import useSWR from 'swr'
import { REQUEST_INIT } from '../constants'
import { useTwitchContext } from '../context'
import type { nullableString, TwitchHookFetcherReturn } from '../types'
import { buildApiUrl, FetcherError, generateError } from '../utils'

/**
 * Fetcher method used to perform `GET` requests on the Twitch API.
 *
 * @param {string} url The URL to fetch
 * @param {HeadersInit} headers The headers to send with the request
 * @returns {Promise<FetcherResponse>} The response data
 */
async function twitchApiFetcher<FetcherResponse>(url: string, headers: HeadersInit): Promise<FetcherResponse> {
  const response = await fetch(url, { ...REQUEST_INIT, headers })
  if (!response.ok) throw await generateError(response)

  return response.json()
}

/**
 * Acts as a wrapper around the `useSWR` to perform `GET` requests on the Twitch API.
 * It prepares the request headers by adding credentials in order to authorize the user.
 *
 * @param {?string} endpoint The Twitch API endpoint to access/fetch
 * @returns {TwitchHookFetcherReturn}
 */
function useTwitchApi<EntityDataType>(endpoint: nullableString): TwitchHookFetcherReturn<EntityDataType> {
  const { accessToken, clientId } = useTwitchContext()

  const url = buildApiUrl(endpoint)
  const headers = {
    'client-id': clientId,
    authorization: `Bearer ${accessToken}`,
  }

  const fetcher: Fetcher<EntityDataType, string> = () => twitchApiFetcher<EntityDataType>(url, headers)

  return useSWR<EntityDataType, FetcherError>(() => (endpoint ? url : null), fetcher, {
    shouldRetryOnError: false,
    refreshInterval: 10000,
  })
}

export { useTwitchApi }
