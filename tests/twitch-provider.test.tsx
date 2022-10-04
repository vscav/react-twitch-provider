import type { RestoreConsole } from 'jest-mock-console'
import mockConsole from 'jest-mock-console'
import React from 'react'
import { getErrorMessage } from '../lib/utils/error'
import { renderWithMockTwitchContext } from './utils/render-with-twitch'

describe('TwitchProvider', () => {
  let restoreConsole: RestoreConsole

  beforeEach(() => (restoreConsole = mockConsole()))
  afterEach(() => restoreConsole())

  it('should throw on a missing Twitch client identifier', async () => {
    try {
      renderWithMockTwitchContext(<div>foo</div>, { clientId: undefined })
    } catch (error) {
      expect(getErrorMessage(error)).toBe(
        'You need to provide an existing and valid Twitch client identifier to the provider. See https://dev.twitch.tv/docs/api/get-started#register-an-application for more information on how to register an application and obtain your Twitch client identifier.',
      )
    }
  })

  it('should throw on an invalid/malformed Twitch client identifier', async () => {
    try {
      renderWithMockTwitchContext(<div>foo</div>, { clientId: '' })
    } catch (error) {
      expect(getErrorMessage(error)).toBe(
        'You need to provide an existing and valid Twitch client identifier to the provider. See https://dev.twitch.tv/docs/api/get-started#register-an-application for more information on how to register an application and obtain your Twitch client identifier.',
      )
    }
  })

  it('should throw on a missing redirect URI', async () => {
    try {
      renderWithMockTwitchContext(<div>foo</div>, { redirectUri: undefined })
    } catch (error) {
      expect(getErrorMessage(error)).toBe(
        'You need to provide a valid URL as the redirect URI that will be used as part of the Twitch OAuth flow.',
      )
    }
  })

  it('should throw on a defined but empty redirect URI', async () => {
    try {
      renderWithMockTwitchContext(<div>foo</div>, { redirectUri: '' })
    } catch (error) {
      expect(getErrorMessage(error)).toBe(
        'You need to provide a valid URL as the redirect URI that will be used as part of the Twitch OAuth flow.',
      )
    }
  })

  it('should throw on an invalid/malformed redirect URI', async () => {
    try {
      renderWithMockTwitchContext(<div>foo</div>, { redirectUri: 'www.bar.com' })
    } catch (error) {
      expect(getErrorMessage(error)).toBe(
        'You need to provide a valid URL as the redirect URI that will be used as part of the Twitch OAuth flow.',
      )
    }
  })
})
