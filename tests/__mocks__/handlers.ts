import { rest } from 'msw'
import { TWITCH_USER_DATA } from './fixtures'
import { isAccessTokenValid, isClientIdValid } from './guards'
import { USERS_PATH, OTHER_PATH } from './paths'
import { wrongAccessToken, wrongClientId } from './responses'

const getUsersHandler = rest.get(USERS_PATH, (request, response, context) => {
  if (!isAccessTokenValid(request.headers.get('authorization'))) return wrongAccessToken(response, context)
  if (!isClientIdValid(request.headers.get('client-id'))) return wrongClientId(response, context)

  return response(
    context.status(200),
    context.json({
      data: [TWITCH_USER_DATA],
    }),
  )
})

const unknownEndpointHandler = rest.get(OTHER_PATH, (request, response, context) => {
  if (!isAccessTokenValid(request.headers.get('authorization'))) return wrongAccessToken(response, context)
  if (!isClientIdValid(request.headers.get('client-id'))) return wrongClientId(response, context)

  return response(context.status(404))
})

const handlers = [getUsersHandler, unknownEndpointHandler]

export { handlers }
