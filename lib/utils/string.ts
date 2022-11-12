/**
 * Checks if a string is empty.
 *
 * @param {string} value A string to be checked.
 * @returns {boolean} Whether the string is empty.
 */
function isEmptyString(value: string): boolean {
  return isString(value) && value.trim().length == 0
}

/**
 * Checks if a given value is a string.
 *
 * @param {?} value A value to be checked.
 * @returns {boolean} Whether the value is a string.
 */
function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String
}

export { isEmptyString, isString }
