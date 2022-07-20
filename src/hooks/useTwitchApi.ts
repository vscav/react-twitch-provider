import type { Fetcher, SWRResponse } from 'swr'
import useSWR from 'swr'
import { useTwitchContext } from '../components/TwitchContext'
import { TWITCH_API_ENDPOINT } from '../constants'

type TwitchHookFetcherReturn<K> = SWRResponse<K, Error>

type CustomRequestInit = Pick<RequestInit, 'method' | 'mode' | 'cache'>

const requestInit: CustomRequestInit = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-store',
}

const twitchApiFetcher = async <T>(url: URL, headers: HeadersInit): Promise<T> => {
  const response = await fetch(url, { ...requestInit, headers })

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data from the Twitch Api.')

    // TODO: handle a custom error on which we could attach extra infos
    throw error
  }

  return response.json()
}

export function useTwitchApi<T>(path: string): TwitchHookFetcherReturn<T> {
  const { accessToken, clientId } = useTwitchContext()
  const url = `${TWITCH_API_ENDPOINT}${path}` as unknown as URL
  const headers = {
    'client-id': clientId,
    Authorization: `Bearer ${accessToken}`,
  }

  const fetcher: Fetcher<T, string> = () => twitchApiFetcher(url, headers)

  return useSWR<T, Error>(url, fetcher, { refreshInterval: 10000 })
}
