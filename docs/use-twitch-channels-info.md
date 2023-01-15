# `useTwitchChannelsInfo`

## Description

Retrieves information about one or more channels.

> See the [Twitch API endpoint documentation](https://dev.twitch.tv/docs/api/reference/#get-channel-information) for more information.

## API options

### Parameters

- `broadcasterId`: **(optional)** _string | string[]_ - ID of the broadcaster whose channel you want to get. To specify more than one ID, use an array containing the ID of each broadcaster you want to get.

### Return Values

- `data`: _TwitchChannel[]_ - Array of Twitch channel objects
- `error`: _FetcherError_ - Error (network, authorization, malformed data, etc.) thrown by the Twitch API fetcher or the hook using it
- `isLoading`: _boolean_ - Boolean to tell whether there's a first request triggered
- `isValidating`: _boolean_ - Boolean to tell whether there's a request or revalidation loading
