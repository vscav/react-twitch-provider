import { renderHook } from '@testing-library/react-hooks'
import mockConsole from 'jest-mock-console'
import { useTwitchContext } from '../lib/context/use-twitch-context'
import { getErrorMessage } from '../lib/utils'
import { renderHookWithMockTwitchContext } from './utils'

describe('useTwitchContext', () => {
  it('should throw if used outside a Twitch provider', () => {
    const restoreConsole = mockConsole()
    const { result } = renderHook(() => useTwitchContext())
    expect(console.error).toHaveBeenCalled()
    expect(getErrorMessage(result.error)).toBe(
      'The TwitchProvider context is undefined. Verify that useTwitchContext() is being called as a child of a <TwitchProvider> component.',
    )
    restoreConsole()
  })

  it('should expose the context data', () => {
    const { result } = renderHookWithMockTwitchContext(() => useTwitchContext())

    expect(result.current.accessToken).toBeDefined()
    expect(result.current.clientId).toBeDefined()
  })

  it('should expose the access token as a string', () => {
    const { result } = renderHookWithMockTwitchContext(() => useTwitchContext())
    expect(typeof result.current.accessToken).toBe('string')
    expect(result.current.accessToken.length).toBeGreaterThan(0)
  })

  it('should expose the client id as a string', () => {
    const { result } = renderHookWithMockTwitchContext(() => useTwitchContext())
    expect(typeof result.current.clientId).toBe('string')
    expect(result.current.accessToken.length).toBeGreaterThan(0)
  })
})
