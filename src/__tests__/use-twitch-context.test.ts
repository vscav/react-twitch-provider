import { renderHook } from '@testing-library/react-hooks'
import { useTwitchContext } from '../context/use-twitch-context'
import { enableErrorOutputSuppression } from '../utils/console'
import { getErrorMessage } from '../utils/error'
import { renderHookWithMockTwitchContext } from '../utils/render-with-twitch'

enableErrorOutputSuppression()

describe('useTwitchContext', () => {
  it('should throw if used outside a Twitch provider', () => {
    const { result } = renderHook(() => useTwitchContext())
    expect(getErrorMessage(result.error)).toBe(
      'The TwitchProvider context is undefined. Verify that useTwitchContext() is being called as a child of a <TwitchProvider> component.',
    )
  })

  it('should expose the context data', async () => {
    const { result } = await renderHookWithMockTwitchContext(() => useTwitchContext())
    expect(result.current.accessToken).toBeDefined()
    expect(result.current.clientId).toBeDefined()
  })

  it('should expose the access token as a string', async () => {
    const { result } = await renderHookWithMockTwitchContext(() => useTwitchContext())
    expect(typeof result.current.accessToken).toBe('string')
    expect(result.current.accessToken.length).toBeGreaterThan(0)
  })

  it('should expose the client id as a string', async () => {
    const { result } = await renderHookWithMockTwitchContext(() => useTwitchContext())
    expect(typeof result.current.clientId).toBe('string')
    expect(result.current.accessToken.length).toBeGreaterThan(0)
  })
})
