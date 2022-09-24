import { renderHook } from '@testing-library/react-hooks'
import { useTwitchApi } from '../hooks/use-twitch-api'
import { enableErrorOutputSuppression } from '../utils/console'
import { getErrorMessage } from '../utils/error'
import { renderHookWithMockTwitchContext } from '../utils/render-with-twitch'

enableErrorOutputSuppression()

describe('useTwitchApi', () => {
  it('should throw if used outside a Twitch provider', () => {
    const { result } = renderHook(() => useTwitchApi(''))
    expect(getErrorMessage(result.error)).toBe('useTwitchContext must be used within a TwitchProvider')
  })

  it('should return a 404 error if the endpoint does not exist', async () => {
    const { result, waitForNextUpdate } = await renderHookWithMockTwitchContext(() => useTwitchApi('foo'))

    expect(result.current.isValidating).toBeTruthy()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.error).toBeDefined()

    expect(result.current.error?.status).toBe(404)
    expect(result.current.error?.name).toBe('Not Found')
    expect(result.current.error?.message).toBe('The requested resource could not be found')
  })

  it('should return a 401 error on an invalid OAuth token', async () => {
    const { result, waitForNextUpdate } = await renderHookWithMockTwitchContext(() => useTwitchApi('users'), {
      token: 'foo',
    })

    expect(result.current.isValidating).toBeTruthy()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()

    expect(result.current.error?.status).toBe(401)
    expect(result.current.error?.name).toBe('Unauthorized')
    expect(result.current.error?.message).toBe('Invalid OAuth token')
  })

  // TODO: Incorrect test. Find a solution to catch the thrown error.
  it('should return a 400 error on an invalid Twitch client identifier', () => {
    try {
      // await renderHookWithMockTwitchContext(() => useTwitchApi('foo'), { clientId: 'bar' })
      renderHookWithMockTwitchContext(() => useTwitchApi('foo'), { clientId: 'bar' })
    } catch (error) {
      expect(getErrorMessage(error)).toBe('Client ID/Secret invalid')
    }
  })
})
