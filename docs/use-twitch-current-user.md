# `useTwitchCurrentUser`

## Description

Retrieves the current logged in user data from the Twitch API.

> See the [Twitch API endpoint documentation](https://dev.twitch.tv/docs/api/reference#get-users) for more information.

## API options

### Return Values

- `data`: _TwitchUser_ - Current logged in user data
- `error`: _FetcherError_ - Error (network, authorization, malformed data, etc.) thrown by the Twitch API fetcher or the hook using it
- `isLoading`: _boolean_ - Boolean to tell whether there's a first request triggered
- `isValidating`: _boolean_ - Boolean to tell whether there's a request or revalidation loading
