import { rest } from 'msw'
import * as channelsDb from './fixtures/data/channels'
import * as cheermotesDb from './fixtures/data/cheermotes'
import * as gamesDB from './fixtures/data/games'
import * as usersDB from './fixtures/data/users'
import { isAccessTokenValid, isClientIdValid } from './guards'
import { CHANNELS_PATH, CHEERMOTES_PATH, OTHER_PATH, TOP_GAMES_PATH, USERS_PATH } from './paths'
import { wrongAccessToken, wrongClientId } from './responses'

const getChannelsHandler = rest.get(CHANNELS_PATH, (request, response, context) => {
  if (!isAccessTokenValid(request.headers.get('authorization'))) return wrongAccessToken(response, context)
  if (!isClientIdValid(request.headers.get('client-id'))) return wrongClientId(response, context)

  const broadcasterIds = request.url.searchParams.getAll('broadcaster_id')
  const channels = channelsDb.getByBroadcasterId(broadcasterIds)

  return response(
    context.status(200),
    context.json({
      data: channels,
    }),
  )
})

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

const getTopGamesHandler = rest.get(TOP_GAMES_PATH, (request, response, context) => {
  if (!isAccessTokenValid(request.headers.get('authorization'))) return wrongAccessToken(response, context)
  if (!isClientIdValid(request.headers.get('client-id'))) return wrongClientId(response, context)

  const paginatedTopGames = gamesDB.getTop({
    first: Number(request.url.searchParams.get('first')) || 20,
    after: request.url.searchParams.get('after') || undefined,
    before: request.url.searchParams.get('before') || undefined,
  })

  return response(
    context.status(200),
    context.json({
      data: paginatedTopGames.data,
      pagination: paginatedTopGames.pagination,
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

const handlers = [getChannelsHandler, getCheermotesHandler, getTopGamesHandler, getUsersHandler, unknownEndpointHandler]

export { handlers }
