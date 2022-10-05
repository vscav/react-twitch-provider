import type { SWRConfiguration } from 'swr'

type FetcherConfig = Omit<SWRConfiguration, 'fetcher'>

export type { FetcherConfig }
