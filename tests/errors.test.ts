import { FetcherError, generateError, getErrorMessage } from '../lib/utils'

describe('Errors', () => {
  describe('generateError', () => {
    it('should return a FetcherError instance', async () => {
      const response = new Response(null, { status: 500 })
      const error = await generateError(response)
      expect(error).toBeInstanceOf(FetcherError)
    })

    it('should handled unexpected http error response', async () => {
      const httpResponse = new Response(null, { status: 428 })
      const error = await generateError(httpResponse)

      expect(error.name).toBe('Unknown error')
      expect(error.status).toBe(428)
      expect(error.message).toBe("Couldn't obtain more details about the error")
    })

    it('should handled expected http error response', async () => {
      const httpResponse = new Response(null, { status: 404 })
      const error = await generateError(httpResponse)

      expect(error.name).toBe('Not Found')
      expect(error.status).toBe(404)
      expect(error.message).toBe('The requested resource could not be found')
    })
  })

  describe('getErrorMessage', () => {
    it('should return a string', () => {
      expect(typeof getErrorMessage(new Error('foo'))).toBe('string')
    })

    it('should return the error message', () => {
      expect(getErrorMessage(new Error('foo'))).toBe('foo')
    })

    it('should return the error message from a string', () => {
      expect(getErrorMessage('foo')).toBe('foo')
    })
  })
})
