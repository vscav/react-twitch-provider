import { buildApiEndpoint, buildQueryString } from '../lib/utils'

describe('API', () => {
  describe('buildApiEndpoint', () => {
    it('should return a string', async () => {
      const endpoint = 'foo'
      expect(typeof buildApiEndpoint(endpoint)).toEqual('string')
    })

    it('should return the given endpoint if no quary parameters map is passed', async () => {
      const endpoint = 'foo'
      expect(buildApiEndpoint(endpoint)).toEqual('foo')
    })

    it('should accept a map of strings to represent the optional query parameters argument', async () => {
      const endpoint = 'foo'
      const params = { bar: 'baz', qux: 'corge' }
      expect(buildApiEndpoint(endpoint, params)).toEqual('foo?bar=baz&qux=corge')
    })

    it('should accept a map of strings arrays to represent the optional query parameters argument', async () => {
      const endpoint = 'foo'
      const params = { baz: ['qux', 'corge'] }
      expect(buildApiEndpoint(endpoint, params)).toEqual('foo?baz=qux&baz=corge')
    })
  })

  describe('buildQueryString', () => {
    it('should return a string', async () => {
      const params = { foo: 'bar' }
      expect(typeof buildQueryString(params)).toEqual('string')
    })

    it('should return null if an empty object is passed', async () => {
      const params = {}
      expect(buildQueryString(params)).toBeNull()
    })

    it('should accept a map of strings with a single entry', async () => {
      const params = { foo: 'bar' }
      expect(buildQueryString(params)).toEqual('foo=bar')
    })

    it('should accept a map of strings with multiple entries', async () => {
      const params = { foo: 'bar', bar: 'baz' }
      expect(buildQueryString(params)).toEqual('foo=bar&bar=baz')
    })

    it('should accept a map of strings arrays', async () => {
      const params = { foo: ['bar', 'baz'] }
      expect(buildQueryString(params)).toEqual('foo=bar&foo=baz')
    })

    it('should accept a map of strings and strings arrays', async () => {
      const params = { foo: 'bar', baz: ['qux', 'corge'] }
      expect(buildQueryString(params)).toEqual('foo=bar&baz=qux&baz=corge')
    })
  })
})
