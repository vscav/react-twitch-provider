import type { SWRResponse } from 'swr'
import type { FetcherError } from '../utils'
import { TPagination } from './pagination'

type TwitchApiDataResponse<EntityType> = { data: EntityType }
type TwitchApiPaginatedDataResponse<EntityType> = TwitchApiDataResponse<EntityType> & { pagination: TPagination }

type TwitchHookBaseReturn = {
  error?: FetcherError
  isValidating: boolean
  isLoading: boolean
}
type TwitchHookFetcherReturn<EntityDataType> = SWRResponse<EntityDataType, FetcherError>

export type { TwitchApiDataResponse, TwitchApiPaginatedDataResponse, TwitchHookBaseReturn, TwitchHookFetcherReturn }
