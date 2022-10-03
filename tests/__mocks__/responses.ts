import type { DefaultBodyType, ResponseComposition, RestContext } from 'msw'
import { TWITCH_INVALID_CLIENT_ID_RESPONSE, TWITCH_INVALID_OAUTH_TOKEN_RESPONSE } from './fixtures'

function wrongAccessToken(response: ResponseComposition<DefaultBodyType>, context: RestContext) {
  return response(context.status(401), context.json(TWITCH_INVALID_OAUTH_TOKEN_RESPONSE))
}

function wrongClientId(response: ResponseComposition<DefaultBodyType>, context: RestContext) {
  return response(context.status(401), context.json(TWITCH_INVALID_CLIENT_ID_RESPONSE))
}

export { wrongAccessToken, wrongClientId }
