import { renderHook } from '@testing-library/react-hooks'
import mockConsole from 'jest-mock-console'
import { ENTITY_IDENTIFIER } from '../lib/constants'
import { useTwitchTopGames } from '../lib/hooks'
import { getErrorMessage } from '../lib/utils'
import { renderHookWithMockTwitchContext } from './utils'
import {
  TWITCH_INTERNAL_SERVER_ERROR_RESPONSE,
  TWITCH_INVALID_CLIENT_ID,
  TWITCH_INVALID_OAUTH_TOKEN,
} from './__mocks__/fixtures'
import * as gamesDb from './__mocks__/fixtures/data/games'
import { TOP_GAMES_PATH } from './__mocks__/paths'
import { rest, server } from './__mocks__/server'

describe('useTwitchTopGames', () => {
  it('should throw an error if used outside a Twitch provider', () => {
    const restoreConsole = mockConsole()
    const { result } = renderHook(() => useTwitchTopGames())
    expect(console.error).toHaveBeenCalled()
    expect(getErrorMessage(result.error)).toBe(
      'The TwitchProvider context is undefined. Verify that useTwitchContext() is being called as a child of a <TwitchProvider> component.',
    )
    restoreConsole()
  })

  it('should return a 200 response with 20 games by default when no option is specified', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchTopGames())

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeDefined()

    expect(result.current.data?.data.length).toEqual(20)
  })

  it('should return a 200 response when specifying the maximum number of games to return per page', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() =>
      useTwitchTopGames({
        first: 5,
      }),
    )

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeDefined()

    expect(result.current.data?.data.length).toEqual(5)
    expect(result.current.data?.pagination.cursor).toEqual('27471')
  })

  it('should return a 200 response when specifying where to start the next page of result using the cursor value', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() =>
      useTwitchTopGames({
        first: 5,
        after: '27471',
      }),
    )

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeDefined()

    expect(result.current.data?.data.length).toEqual(5)
    expect(result.current.data?.pagination.cursor).toEqual('515025')
  })

  it('should return a 200 response when specifying where to start the previous page of result using the cursor value', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() =>
      useTwitchTopGames({
        first: 5,
        before: '493057',
      }),
    )

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeDefined()

    expect(result.current.data?.data.length).toEqual(5)
    expect(result.current.data?.pagination.cursor).toEqual('518203')
  })

  it('should return a 401 error on an invalid Twitch OAuth token', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchTopGames(), {
      accessToken: TWITCH_INVALID_OAUTH_TOKEN,
    })

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error?.status).toBe(401)
    expect(result.current.error?.name).toBe('Unauthorized')
    expect(result.current.error?.message).toBe('Invalid OAuth token')
  })

  it('should return a 401 error on an invalid Twitch client identifier', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchTopGames(), {
      clientId: TWITCH_INVALID_CLIENT_ID,
    })

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error?.status).toBe(401)
    expect(result.current.error?.name).toBe('Unauthorized')
    expect(result.current.error?.message).toBe('Client ID and OAuth token do not match')
  })

  it('should return a 422 error on unexpected/malformed Games data received from the Twitch API', async () => {
    server.use(
      rest.get(TOP_GAMES_PATH, (_, response, context) => {
        const topGames = gamesDb.getTop({
          first: 10,
        })

        const malformedTopGames = topGames.data.map((topGame) => ({ ...topGame, type: 'Unexpected property' }))

        return response(
          context.status(200),
          context.json({
            data: malformedTopGames,
            pagination: topGames.pagination,
          }),
        )
      }),
    )

    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchTopGames())

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error?.status).toBe(422)
    expect(result.current.error?.name).toBe('Unexpected Twitch data format')
    expect(result.current.error?.message).toBe(
      `The response received from the Twitch API does not respect the expected format for the ${ENTITY_IDENTIFIER.GAME} object. It might has been caused by breaking changes in the Twitch API that are not currently handled in the library.`,
    )
  })

  it('should return a 422 error on unexpected/malformed Pagination object received from the Twitch API', async () => {
    server.use(
      rest.get(TOP_GAMES_PATH, (_, response, context) => {
        const topGames = gamesDb.getTop({
          first: 10,
        })

        const malformedPagination = {
          offset: 'Unexpected property',
          limit: 'Unexpected property',
        }

        return response(
          context.status(200),
          context.json({
            data: topGames.data,
            pagination: malformedPagination,
          }),
        )
      }),
    )

    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchTopGames())

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error?.status).toBe(422)
    expect(result.current.error?.name).toBe('Unexpected Twitch pagination format')
    expect(result.current.error?.message).toBe(
      'The response received from the Twitch API does not respect the expected format for the pagination object. It might has been caused by breaking changes in the Twitch API that are not currently handled in the library.',
    )
  })

  it('should return a 500 error on an internal server error', async () => {
    server.use(
      rest.get(TOP_GAMES_PATH, (_, response, context) => {
        return response(context.status(500), context.json(TWITCH_INTERNAL_SERVER_ERROR_RESPONSE))
      }),
    )

    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchTopGames())

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error?.status).toBe(500)
    expect(result.current.error?.name).toBe('Internal Server Error')
    expect(result.current.error?.message).toBe('For an unknown reason, the server cannot process the request')
  })
})
