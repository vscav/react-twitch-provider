import type { SWRResponse } from 'swr'
import type { FetcherError } from '../utils'

type TwitchApiDataResponse<EntityType> = { data: EntityType }

type TwitchHookBaseReturn = {
  error?: FetcherError
  isValidating: boolean
  isLoading: boolean
}
type TwitchHookFetcherReturn<EntityDataType> = SWRResponse<EntityDataType, FetcherError>

export type { TwitchApiDataResponse, TwitchHookBaseReturn, TwitchHookFetcherReturn }
