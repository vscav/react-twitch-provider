import { rest } from 'msw'
import * as cheermotesDb from './fixtures/data/cheermotes'
import * as usersDB from './fixtures/data/users'
import { isAccessTokenValid, isClientIdValid } from './guards'
import { CHEERMOTES_PATH, OTHER_PATH, USERS_PATH } from './paths'
import { wrongAccessToken, wrongClientId } from './responses'

const getCheermotesHandler = rest.get(CHEERMOTES_PATH, (request, response, context) => {
  if (!isAccessTokenValid(request.headers.get('authorization'))) return wrongAccessToken(response, context)
  if (!isClientIdValid(request.headers.get('client-id'))) return wrongClientId(response, context)

  // const broadcasterId = request.url.searchParams.get('broadcaster_id')
  const cheermotes = cheermotesDb.getAll()

  return response(
    context.status(200),
    context.json({
      data: cheermotes,
    }),
  )
})

const getUsersHandler = rest.get(USERS_PATH, (request, response, context) => {
  if (!isAccessTokenValid(request.headers.get('authorization'))) return wrongAccessToken(response, context)
  if (!isClientIdValid(request.headers.get('client-id'))) return wrongClientId(response, context)

  const users = usersDB.getAll()

  return response(
    context.status(200),
    context.json({
      data: users,
    }),
  )
})

const unknownEndpointHandler = rest.get(OTHER_PATH, (_, response, context) => {
  return response(context.status(404))
})

const handlers = [getCheermotesHandler, getUsersHandler, unknownEndpointHandler]

export { handlers }
