import type { Fetcher } from 'swr'
import useSWR from 'swr'
import type { nullableString, TwitchHookFetcherReturn } from '../@types'
import { REQUEST_INIT, TWITCH_API_BASE_URL } from '../constants'
import { useTwitchContext } from '../context/use-twitch-context'
import { FetcherError, generateError } from '../utils'

async function twitchApiFetcher<FetcherResponse>(url: string, headers: HeadersInit): Promise<FetcherResponse> {
  const response = await fetch(url, { ...REQUEST_INIT, headers })
  if (!response.ok) throw await generateError(response)

  return response.json()
}

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
