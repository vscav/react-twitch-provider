# `useTwitchTopGames`

## Description

Gets games sorted by number of current viewers on Twitch, most popular first.

> See the [Twitch API endpoint documentation](https://dev.twitch.tv/docs/api/reference#get-top-games) for more information.

## API options

### Parameters

- `after`: **(optional)** _string_ - Cursor for forward pagination: tells the server where to start fetching the next set of results, in a multi-page response. The cursor value specified here is from the pagination response field of a prior query.
- `before`: **(optional)** _string_ - Cursor for backward pagination: tells the server where to start fetching the next set of results, in a multi-page response. The cursor value specified here is from the pagination response field of a prior query.
- `first`: **(optional)** _number_ - Maximum number of objects to return. Minimum: 1. Maximum: 100. Default: 20.

### Return Values

- `data`: _TwitchGame[]_ - Array of Twitch game objects
- `error`: _FetcherError_ - Error (network, authorization, malformed data, etc.) thrown by the Twitch API fetcher or the hook using it
- `isLoading`: _boolean_ - Boolean to tell whether there's a first request triggered
- `isValidating`: _boolean_ - Boolean to tell whether there's a request or revalidation loading
