import type { Fetcher, SWRResponse } from 'swr'
import useSWR from 'swr'
import { z } from 'zod'
import { useTwitchContext } from '../components/TwitchContext'
import { TWITCH_API_ENDPOINT } from '../constants'
import { FetcherError, httpStatusMap } from '../utils/error'

type TwitchApiDataResponse<EntityType> = { data: EntityType }
type TwitchHookFetcherReturn<EntityDataType> = SWRResponse<EntityDataType, FetcherError>

const TwitchApiError = z.object({
  error: z.string(),
  message: z.string(),
  status: z.number(),
})
type TwitchApiError = z.infer<typeof TwitchApiError>

type CustomRequestInit = Pick<RequestInit, 'method' | 'mode' | 'cache'>
const requestInit: CustomRequestInit = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-store',
}

function safelyValidateTwitchApiError(maybeTwitchApiError: unknown) {
  const { success: isTwitchApiError } = TwitchApiError.safeParse(maybeTwitchApiError)
  return isTwitchApiError
}

async function generateApiFetcherError(fetcherResponse: Response) {
  const parsedResponse = await fetcherResponse.json()

  const isTwitchApiError = safelyValidateTwitchApiError(parsedResponse)

  const genericErrorInformation = httpStatusMap.get(fetcherResponse.status)

  const name = genericErrorInformation?.name || 'Unknown error'
  const status = fetcherResponse.status
  const message = isTwitchApiError
    ? (parsedResponse as TwitchApiError).message
    : genericErrorInformation?.message || "Couldn't obtain more details about the error"

  return new FetcherError(name, status, message)
}

async function twitchApiFetcher<FetcherResponse>(url: string, headers: HeadersInit): Promise<FetcherResponse> {
  const response = await fetch(url, { ...requestInit, headers })

  if (!response.ok) {
    throw await generateApiFetcherError(response)
  }

  return response.json()
}

function useTwitchApi<EntityDataType>(path: string): TwitchHookFetcherReturn<EntityDataType> {
  const { accessToken, clientId } = useTwitchContext()
  const url = `${TWITCH_API_ENDPOINT}${path}`
  const headers = {
    'client-id': clientId,
    Authorization: `Bearer ${accessToken}`,
  }

  const fetcher: Fetcher<EntityDataType, string> = () => twitchApiFetcher<EntityDataType>(url, headers)

  return useSWR<EntityDataType, FetcherError>(url, fetcher, { shouldRetryOnError: false, refreshInterval: 10000 })
}

export type { TwitchApiDataResponse }
export { useTwitchApi }
