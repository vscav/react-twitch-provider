# `useTwitchCheermotes`

## Description

Retrieves the list of available Cheermotes, animated emotes to which viewers can assign Bits, to cheer in chat. Cheermotes returned are available throughout Twitch, in all Bits-enabled channels.

> See the [Twitch API endpoint documentation](https://dev.twitch.tv/docs/api/reference#get-cheermotes) for more information.

## API options

### Parameters

- `broadcasterId`: **(optional)** _string_ - ID for the broadcaster who might own specialized Cheermotes.

### Return Values

- `data`: _TwitchCheermote[]_ - Array of Twitch cheermote objects
- `error`: _FetcherError_ - Error (network, authorization, malformed data, etc.) thrown by the Twitch API fetcher or the hook using it
- `isLoading`: _boolean_ - Boolean to tell whether there's a first request triggered
- `isValidating`: _boolean_ - Boolean to tell whether there's a request or revalidation loading
