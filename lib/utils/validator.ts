import { Cheermotes, Games, User } from '../types'
import { Pagination } from '../types/pagination'

function safelyValidateCheermotesData(maybeCheermotesData: unknown) {
  const { success: areCheermotesDataValid } = Cheermotes.safeParse(maybeCheermotesData)
  return areCheermotesDataValid
}

function safelyValidateGamesData(maybeGamesData: unknown) {
  const { success: areGamesDataValid } = Games.safeParse(maybeGamesData)
  return areGamesDataValid
}

function safelyValidatePagination(maybePagination: unknown) {
  const { success: isPaginationValid } = Pagination.safeParse(maybePagination)
  return isPaginationValid
}

function safelyValidateUserData(maybeUserData: unknown) {
  const { success: isUserDataValid } = User.safeParse(maybeUserData)
  return isUserDataValid
}

export { safelyValidateCheermotesData, safelyValidateGamesData, safelyValidatePagination, safelyValidateUserData }
