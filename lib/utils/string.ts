function isEmptyString(value: string): boolean {
  return isString(value) && value.trim().length == 0
}

function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String
}

export { isEmptyString, isString }
