import { rest } from 'msw'
import { TWITCH_BROADCASTER_CHEERMOTES_DATA, TWITCH_CHEERMOTES_DATA, TWITCH_USERS_DATA } from './fixtures'
import { isAccessTokenValid, isClientIdValid } from './guards'
import { CHEERMOTES_PATH, OTHER_PATH, USERS_PATH } from './paths'
import { wrongAccessToken, wrongClientId } from './responses'

const getCheermotesHandler = rest.get(CHEERMOTES_PATH, (request, response, context) => {
  if (!isAccessTokenValid(request.headers.get('authorization'))) return wrongAccessToken(response, context)
  if (!isClientIdValid(request.headers.get('client-id'))) return wrongClientId(response, context)

  const broadcasterId = request.url.searchParams.get('broadcaster_id')

  if (broadcasterId) {
    return response(
      context.status(200),
      context.json({
        data: TWITCH_BROADCASTER_CHEERMOTES_DATA,
      }),
    )
  }

  return response(
    context.status(200),
    context.json({
      data: TWITCH_CHEERMOTES_DATA,
    }),
  )
})

const getUsersHandler = rest.get(USERS_PATH, (request, response, context) => {
  if (!isAccessTokenValid(request.headers.get('authorization'))) return wrongAccessToken(response, context)
  if (!isClientIdValid(request.headers.get('client-id'))) return wrongClientId(response, context)

  return response(
    context.status(200),
    context.json({
      data: TWITCH_USERS_DATA,
    }),
  )
})

const unknownEndpointHandler = rest.get(OTHER_PATH, (_, response, context) => {
  return response(context.status(404))
})

const handlers = [getCheermotesHandler, getUsersHandler, unknownEndpointHandler]

export { handlers }
