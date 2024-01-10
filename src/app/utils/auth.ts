import { IUserLogin } from './mock-data'

const USER_INFO = 'userInfo'

export const getUserInfoToLS = (): IUserLogin | null => {
  const user = localStorage.getItem(USER_INFO)
  if (user) {
    return JSON.parse(user)
  }
  return null
}

export const saveUserInfoToLS = (user: IUserLogin) => {
  localStorage.setItem(USER_INFO, JSON.stringify(user))
}
