import userLoginData from './user-login.json'

export interface IUserLogin {
  username: string
  password: string
  role: string[]
}

export const apiLogin = ({ username, password }: { username: string; password: string }) =>
  new Promise<IUserLogin | undefined>((rel, reject) => {
    setTimeout(() => {
      const user = userLoginData.find(
        (user) =>
          user.username.toString() === username.toString() &&
          user.password.toString() === password.toString()
      )

      if (user) {
        rel(user)
      } else {
        rel(undefined)
      }
    }, 2000)
  })
