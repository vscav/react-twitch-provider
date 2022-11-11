import TwitchProvider, { useTwitchCheermotes, useTwitchTopGames, useTwitchUser } from '../lib'

describe('Package exports', () => {
  it('should export the Twitch provider as a default export', () => {
    expect(TwitchProvider).toBeDefined()
  })

  it('should export the useTwitchCheermotes hook as a named export', () => {
    expect(useTwitchCheermotes).toBeDefined()
  })

  it('should export the useTwitchTopGames hook as a named export', () => {
    expect(useTwitchTopGames).toBeDefined()
  })

  it('should export the useTwitchUser hook as a named export', () => {
    expect(useTwitchUser).toBeDefined()
  })
})
