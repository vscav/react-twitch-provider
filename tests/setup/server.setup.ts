import 'whatwg-fetch'
import { server } from '../__mocks__/server'

beforeAll(() =>
  server.listen({
    // Should never be called, as an unhandled requests handler has already been setup.
    // If the handler is deleted, this will replace it.
    onUnhandledRequest(request) {
      console.error('Found an unhandled %s request to %s', request.method, request.url.href)
    },
  }),
)

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
