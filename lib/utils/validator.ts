import { Cheermotes, Games, User } from '../types'
import { Pagination } from '../types/pagination'

function safelyValidateCheermotesData(maybeCheermotesData: unknown): boolean {
  const { success: areCheermotesDataValid } = Cheermotes.safeParse(maybeCheermotesData)
  return areCheermotesDataValid
}

function safelyValidateGamesData(maybeGamesData: unknown): boolean {
  const { success: areGamesDataValid } = Games.safeParse(maybeGamesData)
  return areGamesDataValid
}

function safelyValidatePagination(maybePagination: unknown): boolean {
  const { success: isPaginationValid } = Pagination.safeParse(maybePagination)
  return isPaginationValid
}

function safelyValidateUserData(maybeUserData: unknown): boolean {
  const { success: isUserDataValid } = User.safeParse(maybeUserData)
  return isUserDataValid
}

export { safelyValidateCheermotesData, safelyValidateGamesData, safelyValidatePagination, safelyValidateUserData }
