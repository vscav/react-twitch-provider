import React from 'react'
import { enableErrorOutputSuppression } from '../utils/console'
import { getErrorMessage } from '../utils/error'
import { renderWithMockTwitchContext } from '../utils/render-with-twitch'

enableErrorOutputSuppression()

describe('TwitchProvider', () => {
  it('should throw on a missing or invalid/malformed Twitch client identifier', async () => {
    try {
      await renderWithMockTwitchContext(<div>foo</div>, { clientId: '' })
    } catch (error) {
      expect(getErrorMessage(error)).toBe(
        'You need to provide an existing and valid Twitch client identifier to the provider. See https://dev.twitch.tv/docs/api/get-started#register-an-application for more information on how to register an application and obtain your Twitch client identifier.',
      )
    }
  })
})
