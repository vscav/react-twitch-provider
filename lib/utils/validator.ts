import { Channels, Cheermotes, Games, TwitchApiError, User } from '../types'
import { Pagination } from '../types/pagination'

/**
 * Checks (safely, without throwing) if a given value respects the format of a Twitch channel entities array.
 *
 * @param {?} maybeChannelsData The value to be checked.
 * @returns {boolean} Whether the value is a valid Twitch channel entities array.
 */
function safelyValidateChannelsData(maybeChannelsData: unknown): boolean {
  const { success: areChannelsDataValid } = Channels.safeParse(maybeChannelsData)
  return areChannelsDataValid
}

/**
 * Checks (safely, without throwing) if a given value respects the format of a Twitch cheermote entities array.
 *
 * @param {?} maybeCheermotesData The value to be checked.
 * @returns {boolean} Whether the value is a valid Twitch cheermote entities array.
 */
function safelyValidateCheermotesData(maybeCheermotesData: unknown): boolean {
  const { success: areCheermotesDataValid } = Cheermotes.safeParse(maybeCheermotesData)
  return areCheermotesDataValid
}

/**
 * Checks (safely, without throwing) if a given value respects the format of a Twitch game entities array.
 *
 * @param {?} maybeGamesData The value to be checked.
 * @returns {boolean} Whether the value is a valid Twitch game entities array.
 */
function safelyValidateGamesData(maybeGamesData: unknown): boolean {
  const { success: areGamesDataValid } = Games.safeParse(maybeGamesData)
  return areGamesDataValid
}

/**
 * Checks (safely, without throwing) if a given value respects the format of the pagination defined by the Twitch API.
 *
 * @param {?} maybePagination The value to be checked.
 * @returns {boolean} Whether the value is a valid Twitch pagination.
 */
function safelyValidatePagination(maybePagination: unknown): boolean {
  const { success: isPaginationValid } = Pagination.safeParse(maybePagination)
  return isPaginationValid
}

/**
 * Checks (safely, without throwing) if a given value respects the format of error defined by the Twitch API.
 *
 * @param {?} maybeTwitchApiError The value to be checked.
 * @returns {boolean} Whether the value is a valid Twitch error.
 */
function safelyValidateTwitchApiError(maybeTwitchApiError: unknown): boolean {
  const { success: isTwitchApiError } = TwitchApiError.safeParse(maybeTwitchApiError)
  return isTwitchApiError
}

/**
 * Checks (safely, without throwing) if a given value respects the format of a Twitch user entity.
 *
 * @param {?} maybeUserData The value to be checked.
 * @returns {boolean} Whether the value is a valid Twitch user entity.
 */
function safelyValidateUserData(maybeUserData: unknown): boolean {
  const { success: isUserDataValid } = User.safeParse(maybeUserData)
  return isUserDataValid
}

export {
  safelyValidateChannelsData,
  safelyValidateCheermotesData,
  safelyValidateGamesData,
  safelyValidatePagination,
  safelyValidateTwitchApiError,
  safelyValidateUserData,
}
