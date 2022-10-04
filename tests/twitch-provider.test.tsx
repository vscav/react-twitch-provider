import type { RestoreConsole } from 'jest-mock-console'
import mockConsole from 'jest-mock-console'
import React from 'react'
import { renderWithMockTwitchContext } from './utils/render-with-twitch'
import { spyRedirectForToken } from './__mocks__/provider'

describe('TwitchProvider', () => {
  let restoreConsole: RestoreConsole

  beforeEach(() => (restoreConsole = mockConsole()))
  afterEach(() => restoreConsole())

  it('should throw on a missing Twitch client identifier', () => {
    expect(() => renderWithMockTwitchContext(<div>foo</div>, { clientId: undefined })).toThrow(
      new Error(
        'You need to provide an existing and valid Twitch client identifier to the provider. See https://dev.twitch.tv/docs/api/get-started#register-an-application for more information on how to register an application and obtain your Twitch client identifier.',
      ),
    )
  })

  it('should throw on an invalid/malformed Twitch client identifier', () => {
    expect(() => renderWithMockTwitchContext(<div>foo</div>, { clientId: '' })).toThrow(
      new Error(
        'You need to provide an existing and valid Twitch client identifier to the provider. See https://dev.twitch.tv/docs/api/get-started#register-an-application for more information on how to register an application and obtain your Twitch client identifier.',
      ),
    )
  })

  it('should throw on a missing redirect URI', () => {
    expect(() => renderWithMockTwitchContext(<div>foo</div>, { redirectUri: undefined })).toThrow(
      new Error(
        'You need to provide a valid URL as the redirect URI that will be used as part of the Twitch OAuth flow.',
      ),
    )
  })

  it('should throw on a defined but empty redirect URI', () => {
    expect(() => renderWithMockTwitchContext(<div>foo</div>, { redirectUri: '' })).toThrow(
      new Error(
        'You need to provide a valid URL as the redirect URI that will be used as part of the Twitch OAuth flow.',
      ),
    )
  })

  it('should throw on an invalid/malformed redirect URI', () => {
    expect(() => renderWithMockTwitchContext(<div>foo</div>, { redirectUri: 'www.bar.com' })).toThrow(
      new Error(
        'You need to provide a valid URL as the redirect URI that will be used as part of the Twitch OAuth flow.',
      ),
    )
  })

  it('should redirect the user to obtain an access token if it is still undefined', () => {
    renderWithMockTwitchContext(<div>foo</div>, { accessToken: undefined })
    expect(spyRedirectForToken).toHaveBeenCalledTimes(1)
  })
})
