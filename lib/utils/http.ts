enum HTTPMethods {
  /**
   * The `CONNECT` method establishes a tunnel to the server identified by the
   * target resource.
   */
  connect = 'CONNECT',

  /**
   * The `DELETE` method deletes the specified resource.
   */
  delete = 'DELETE',

  /**
   * The `GET` method requests a representation of the specified resource.
   * Requests using GET should only retrieve data.
   */
  get = 'GET',

  /**
   * The `HEAD` method asks for a response identical to that of a GET request,
   * but without the response body.
   */
  head = 'HEAD',

  /**
   * The `OPTIONS` method is used to describe the communication options for the
   * target resource.
   */
  options = 'OPTIONS',

  /**
   * The PATCH method is used to apply partial modifications to a resource.
   */
  patch = 'PATCH',

  /**
   * The `POST` method is used to submit an entity to the specified resource,
   * often causing a change in state or side effects on the server.
   */
  post = 'POST',

  /**
   * The `PUT` method replaces all current representations of the target
   * resource with the request payload.
   */
  put = 'PUT',

  /**
   * The `TRACE` method performs a message loop-back test along the path to the
   * target resource.
   */
  trace = 'TRACE',
}

type HTTPMethod = `${HTTPMethods}`

export type { HTTPMethod }
export { HTTPMethods }
