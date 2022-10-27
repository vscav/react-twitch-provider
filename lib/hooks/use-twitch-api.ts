import type { Fetcher, SWRResponse } from 'swr'
import useSWR from 'swr'
import { TWITCH_API_BASE_URL } from '../constants/twitch-api'
import { useTwitchContext } from '../context/use-twitch-context'
import { FetcherError, generateError } from '../utils/error'
import { HTTPMethod } from '../utils/http'

type TwitchApiDataResponse<EntityType> = { data: EntityType }

type TwitchHookBaseReturn = {
  error?: FetcherError
  isValidating: boolean
  isLoading: boolean
}
type TwitchHookFetcherReturn<EntityDataType> = SWRResponse<EntityDataType, FetcherError>

type CustomRequestInit = Pick<RequestInit, 'mode' | 'cache'>
const requestInit: CustomRequestInit = {
  mode: 'cors',
  cache: 'no-store',
}

async function twitchApiFetcher<FetcherResponse>(
  url: string,
  method: HTTPMethod,
  headers: HeadersInit,
): Promise<FetcherResponse> {
  const response = await fetch(url, { ...requestInit, method, headers })
  if (!response.ok) throw await generateError(response)

  return response.json()
}

function useTwitchApi<EntityDataType>(endpoint: string, method: HTTPMethod): TwitchHookFetcherReturn<EntityDataType> {
  const { accessToken, clientId } = useTwitchContext()

  const path = `${TWITCH_API_BASE_URL}/${endpoint}`
  const headers = {
    'client-id': clientId,
    authorization: `Bearer ${accessToken}`,
  }

  const fetcher: Fetcher<EntityDataType, string> = () => twitchApiFetcher<EntityDataType>(path, method, headers)

  return useSWR<EntityDataType, FetcherError>(path, fetcher, { shouldRetryOnError: false, refreshInterval: 10000 })
}

export type { TwitchApiDataResponse, TwitchHookBaseReturn }
export { useTwitchApi }
