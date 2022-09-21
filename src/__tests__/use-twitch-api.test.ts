import { renderHook } from '@testing-library/react-hooks'
import { useTwitchApi } from '../hooks/use-twitch-api'
import { enableErrorOutputSuppression } from '../utils/console'
import { getErrorMessage } from '../utils/error'
import { renderHookWithMockTwitchContext } from '../utils/render-with-twitch'

enableErrorOutputSuppression()

describe('useTwitchApi', () => {
  it('should throw if used outside a Twitch provider', () => {
    try {
      renderHook(() => useTwitchApi(''))
    } catch (error) {
      expect(getErrorMessage(error)).toBe('useTwitchContext must be used within a TwitchProvider')
    }
  })

  it('should be in validation state while waiting for the resource to resolve', async () => {
    const { result } = await renderHookWithMockTwitchContext(() => useTwitchApi('foo'))
    expect(result.current.isValidating).toBeTruthy()
  })

  it('should return a 404 error if the endpoint does not exist', async () => {
    const { result, waitForNextUpdate } = await renderHookWithMockTwitchContext(() => useTwitchApi('foo'))

    expect(result.current.isValidating).toBeTruthy()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.error).toBeDefined()

    expect(result.current.error?.status).toBe(404)
    expect(result.current.error?.name).toBe('Not Found')
    expect(result.current.error?.message).toBe(
      'The requested page could not be found but may be available again in the future',
    )
  })

  // TODO: Add the following test cases:
  // it('should return a 400 error on a missing or invalid Twitch client identifier')
  // it('should return a 401 error on a missing or invalid access token but with an existing Twitch client identifier')
  // it('should return a 401 error on a missing or invalid Twitch client identifier but with an existing access token')
})
