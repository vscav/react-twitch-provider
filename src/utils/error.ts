class FetcherError extends Error {
  name
  status

  constructor(name: string, status: number, message: string) {
    super(message)

    this.name = name
    this.status = status

    Object.setPrototypeOf(this, FetcherError.prototype)
  }
}

const httpStatusMap = new Map<number, { name: string; message: string }>()
  .set(100, {
    name: 'Continue',
    message: 'The server has received the request headers, and the client should proceed to send the request body',
  })
  .set(101, {
    name: 'Switching Protocols',
    message: 'The requester has asked the server to switch protocols',
  })
  .set(103, {
    name: 'Checkpoint',
    message: 'Used in the resumable requests proposal to resume aborted PUT or POST requests',
  })
  .set(200, {
    name: 'OK',
    message: 'The request is OK (this is the standard response for successful HTTP requests)',
  })
  .set(201, {
    name: 'Created',
    message: 'The request has been fulfilled',
  })
  .set(202, {
    name: 'Accepted',
    message: 'The request has been accepted for processing',
  })
  .set(203, {
    name: 'Non-Authoritative Information',
    message: 'The request has been successfully processed',
  })
  .set(204, {
    name: 'No Content',
    message: 'The request has been successfully processed',
  })
  .set(205, {
    name: 'Reset Content',
    message: 'The request has been successfully processed',
  })
  .set(206, {
    name: 'Partial Content',
    message: 'The server is delivering only part of the resource due to a range header sent by the client',
  })
  .set(400, {
    name: 'Bad Request',
    message: 'The request cannot be fulfilled due to bad syntax',
  })
  .set(401, {
    name: 'Unauthorized',
    message: 'The request was a legal request',
  })
  .set(402, {
    name: 'Payment Required',
    message: 'Reserved for future use',
  })
  .set(403, {
    name: 'Forbidden',
    message: 'The request was a legal request',
  })
  .set(404, {
    name: 'Not Found',
    message: 'The requested page could not be found but may be available again in the future',
  })
  .set(405, {
    name: 'Method Not Allowed',
    message: 'A request was made of a page using a request method not supported by that page',
  })
  .set(406, {
    name: 'Not Acceptable',
    message: 'The server can only generate a response that is not accepted by the client',
  })
  .set(407, {
    name: 'Proxy Authentication Required',
    message: 'The client must first authenticate itself with the proxy',
  })
  .set(408, {
    name: 'Request',
    message: ' Timeout\tThe server timed out waiting for the request',
  })
  .set(409, {
    name: 'Conflict',
    message: 'The request could not be completed because of a conflict in the request',
  })
  .set(410, {
    name: 'Gone',
    message: 'The requested page is no longer available',
  })
  .set(411, {
    name: 'Length Required',
    message: 'The "Content-Length" is not defined. The server will not accept the request without it',
  })
  .set(412, {
    name: 'Precondition',
    message: ' Failed. The precondition given in the request evaluated to false by the server',
  })
  .set(413, {
    name: 'Request Entity Too Large',
    message: 'The server will not accept the request',
  })
  .set(414, {
    name: 'Request-URI Too Long',
    message: 'The server will not accept the request',
  })
  .set(415, {
    name: 'Unsupported Media Type',
    message: 'The server will not accept the request',
  })
  .set(416, {
    name: 'Requested Range Not Satisfiable',
    message: 'The client has asked for a portion of the file',
  })
  .set(417, {
    name: 'Expectation Failed',
    message: 'The server cannot meet the requirements of the Expect request-header field',
  })
  .set(500, {
    name: 'Internal Server Error',
    message: 'For an unknown reason, the server cannot process the request',
  })
  .set(501, {
    name: 'Not Implemented',
    message: 'The server either does not recognize the request method',
  })
  .set(502, {
    name: 'Bad Gateway',
    message: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server',
  })
  .set(503, {
    name: 'Service Unavailable',
    message: 'The server is currently unavailable (overloaded or down)',
  })
  .set(504, {
    name: 'Gateway Timeout',
    message:
      'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server',
  })
  .set(505, {
    name: 'HTTP Version Not Supported',
    message: 'The server does not support the HTTP protocol version used in the request',
  })
  .set(511, {
    name: 'Network Authentication Required',
    message: 'The client needs to auth',
  })

export { FetcherError, httpStatusMap }
