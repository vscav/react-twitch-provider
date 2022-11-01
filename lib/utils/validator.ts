import { Cheermotes, User } from '../types'

function safelyValidateCheermotesData(maybeCheermotesData: unknown) {
  const { success: areCheermotesDataValid } = Cheermotes.safeParse(maybeCheermotesData)
  return areCheermotesDataValid
}

function safelyValidateUserData(maybeUserData: unknown) {
  const { success: isUserDataValid } = User.safeParse(maybeUserData)
  return isUserDataValid
}

export { safelyValidateCheermotesData, safelyValidateUserData }
