import { isEmptyString, isString } from './string'

/**
 * Checks if a given value is a valid URL.
 *
 * @param {?} value A value to be checked.
 * @returns {boolean} Whether the value is a valid URL.
 */
function isUrl(value: unknown): boolean {
  let res = false

  if (isString(value) && !isEmptyString(value)) {
    const urlRegex =
      '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$'
    res = !(value.length < 2083 && new RegExp(urlRegex, 'i').test(value)) ? false : true
  }

  return res
}

export { isUrl }
