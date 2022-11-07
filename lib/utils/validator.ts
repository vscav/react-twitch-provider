import { Cheermotes, Games, User } from '../types'

function safelyValidateCheermotesData(maybeCheermotesData: unknown) {
  const { success: areCheermotesDataValid } = Cheermotes.safeParse(maybeCheermotesData)
  return areCheermotesDataValid
}

function safelyValidateGamesData(maybeGamesData: unknown) {
  const { success: areGamesDataValid } = Games.safeParse(maybeGamesData)
  return areGamesDataValid
}

function safelyValidateUserData(maybeUserData: unknown) {
  const { success: isUserDataValid } = User.safeParse(maybeUserData)
  return isUserDataValid
}

export { safelyValidateCheermotesData, safelyValidateGamesData, safelyValidateUserData }
