import { renderHook } from '@testing-library/react-hooks'
import mockConsole from 'jest-mock-console'
import { ENTITY_IDENTIFIER } from '../lib/constants'
import { useTwitchCheermotes } from '../lib/hooks'
import { getErrorMessage } from '../lib/utils'
import { renderHookWithMockTwitchContext } from './utils'
import {
  TWITCH_BROADCASTER_CHEERMOTES_DATA,
  TWITCH_CHEERMOTES_DATA,
  TWITCH_INTERNAL_SERVER_ERROR_RESPONSE,
  TWITCH_INVALID_CLIENT_ID,
  TWITCH_INVALID_OAUTH_TOKEN,
  UNEXPECTED_TWITCH_CHEERMOTES_DATA,
} from './__mocks__/fixtures'
import { CHEERMOTES_PATH } from './__mocks__/paths'
import { rest, server } from './__mocks__/server'

describe('useTwitchCheermotes', () => {
  it('should throw an error if used outside a Twitch provider', () => {
    const restoreConsole = mockConsole()
    const { result } = renderHook(() => useTwitchCheermotes())
    expect(console.error).toHaveBeenCalled()
    expect(getErrorMessage(result.error)).toBe(
      'The TwitchProvider context is undefined. Verify that useTwitchContext() is being called as a child of a <TwitchProvider> component.',
    )
    restoreConsole()
  })

  it('should return a 200 response with data', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchCheermotes())

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toEqual(TWITCH_CHEERMOTES_DATA)
  })

  it('should return a 200 response with data when passing a broadcaster identifier', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchCheermotes('123456789'))

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toEqual(TWITCH_BROADCASTER_CHEERMOTES_DATA)
  })

  it('should be in idle state when passing an undefined broadcaster identifier', async () => {
    const { result } = renderHookWithMockTwitchContext(() => useTwitchCheermotes(undefined))

    expect(result.current.isValidating).toBeFalsy()
  })

  it('should return a 200 response even if the received data is an empty Cheermotes array', async () => {
    server.use(
      rest.get(CHEERMOTES_PATH, (_, response, context) => {
        return response(
          context.status(200),
          context.json({
            data: [],
          }),
        )
      }),
    )

    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchCheermotes())

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toEqual([])
  })

  it('should return a 401 error on an invalid Twitch OAuth token', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchCheermotes(), {
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
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchCheermotes(), {
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

  it('should return a 422 error on unexpected/malformed Cheermotes data received from the Twitch API', async () => {
    server.use(
      rest.get(CHEERMOTES_PATH, (_, response, context) => {
        return response(
          context.status(200),
          context.json({
            data: UNEXPECTED_TWITCH_CHEERMOTES_DATA,
          }),
        )
      }),
    )

    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchCheermotes())

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
      `The response received from the Twitch API does not respect the expected format for the ${ENTITY_IDENTIFIER.CHEERMOTE} object. It might has been caused by breaking changes in the Twitch API that are not currently handled in the library.`,
    )
  })

  it('should return a 500 error on an internal server error', async () => {
    server.use(
      rest.get(CHEERMOTES_PATH, (_, response, context) => {
        return response(context.status(500), context.json(TWITCH_INTERNAL_SERVER_ERROR_RESPONSE))
      }),
    )

    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchCheermotes())

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
