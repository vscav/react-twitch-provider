import type { Fetcher, SWRResponse } from 'swr'
import useSWR from 'swr'
import { __test__ } from '../constants/env'
import { TWITCH_API_ENDPOINT, TWITCH_MOCK_API_ENDPOINT } from '../constants/twitch-api'
import { useTwitchContext } from '../context/twitch-context'
import { FetcherError, generateError } from '../utils/error'

type TwitchApiDataResponse<EntityType> = { data: EntityType }
type TwitchHookFetcherReturn<EntityDataType> = SWRResponse<EntityDataType, FetcherError>

type CustomRequestInit = Pick<RequestInit, 'method' | 'mode' | 'cache'>
const requestInit: CustomRequestInit = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-store',
}

async function twitchApiFetcher<FetcherResponse>(url: string, headers: HeadersInit): Promise<FetcherResponse> {
  const response = await fetch(url, { ...requestInit, headers })
  if (!response.ok) throw await generateError(response)

  return response.json()
}

function useTwitchApi<EntityDataType>(path: string): TwitchHookFetcherReturn<EntityDataType> {
  const { accessToken, clientId } = useTwitchContext()

  const url = `${__test__ ? TWITCH_MOCK_API_ENDPOINT : TWITCH_API_ENDPOINT}${path}`
  const headers = {
    'client-id': clientId,
    Authorization: `Bearer ${accessToken}`,
  }

  const fetcher: Fetcher<EntityDataType, string> = () => twitchApiFetcher<EntityDataType>(url, headers)

  return useSWR<EntityDataType, FetcherError>(url, fetcher, { shouldRetryOnError: false, refreshInterval: 10000 })
}

export type { TwitchApiDataResponse }
export { useTwitchApi }
