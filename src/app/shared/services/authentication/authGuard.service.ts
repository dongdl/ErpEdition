import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { getUserInfoToLS } from '../../../utils/auth'
import { intersectArray } from '../../../utils/helper'
import { IUserLogin } from '../../../utils/mock-data'
import ROLES from '../../../utils/roles'
import { MenuItem } from '../../model/util.model'

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (getUserInfoToLS()) {
    return true
  }

  router.navigate(['login'])

  return false
}

export const redirectToMainPage: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const user = getUserInfoToLS() as IUserLogin
  if (user) {
    const { role } = user
    if (role.includes(ROLES.USER)) {
      router.navigate(['thong-tin-tuyen-dung-can-xu-ly'])
    } else if (role.includes(ROLES.MANAGER_1) || role.includes(ROLES.MANAGER_2)) {
      router.navigate(['duyet-thong-tin-hai-mat'])
    } else {
      router.navigate(['quan-ly-nguoi-dung'])
    }
    return false
  }
  return true
}

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const user = getUserInfoToLS() as IUserLogin
  const { role } = user

  if (!role.includes(ROLES.ADMIN)) {
    if (role.includes(ROLES.USER)) {
      router.navigate(['thong-tin-tuyen-dung'])
    } else if (role.includes(ROLES.MANAGER_1) || role.includes(ROLES.MANAGER_2)) {
      router.navigate(['duyet-thong-tin-hai-mat'])
    }
    return false
  }
  return true
}

export const redirect: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const user = getUserInfoToLS() as IUserLogin
  const { username } = user
  if (username === 'admin') {
    router.navigate(['quan-ly-nguoi-dung'])
  } else if (username === 'user') {
    router.navigate(['thong-tin-tuyen-dung-can-xu-ly'])
  } else if (username === 'manager1' || username === 'manager2') {
    router.navigate(['duyet-thong-tin-hai-mat'])
  }
  return false
}

export const recordListGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const user = getUserInfoToLS() as IUserLogin
  const { role } = user
  if (!(role.includes(ROLES.ADMIN) || role.includes(ROLES.USER))) {
    router.navigate(['duyet-thong-tin-hai-mat'])
    return false
  }
  return true
}

export const verifyRecordGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const user = getUserInfoToLS() as IUserLogin
  const { role } = user
  if (
    !(
      role.includes(ROLES.ADMIN) ||
      role.includes(ROLES.MANAGER_1) ||
      role.includes(ROLES.MANAGER_2)
    )
  ) {
    router.navigate(['thong-tin-tuyen-dung-can-xu-ly'])
    return false
  }
  return true
}

export const sidebarForEachRole = (menuList: MenuItem[]) => {
  const data = getUserInfoToLS()

  if (!data) return []
  const { role } = data
  menuList.forEach((menu) => {
    if (!menu.roles) {
      menu.hidden = false
    } else {
      const roleArr = intersectArray(menu.roles, role)

      if (menu.key === 'user-management') {
        if (roleArr.includes(ROLES.ADMIN)) {
          menu.hidden = false
        } else {
          menu.hidden = true
        }
      }

      if (menu.key === 'recruitment') {
        menu.hidden = !(
          roleArr.includes(ROLES.ADMIN) ||
          roleArr.includes(ROLES.USER) ||
          roleArr.includes(ROLES.MANAGER_2) ||
          roleArr.includes(ROLES.MANAGER_1)
        )

        if (menu?.subMenu) {
          menu.subMenu.forEach((submenu) => {
            const roleArr = intersectArray(submenu.roles as string[], role)

            if (submenu.key === 'recruitment-manager') {
              submenu.hidden = !(roleArr.includes(ROLES.ADMIN) || roleArr.includes(ROLES.USER))
            }

            if (submenu.key === 'verify') {
              submenu.hidden = !(
                roleArr.includes(ROLES.ADMIN) ||
                roleArr.includes(ROLES.MANAGER_1) ||
                roleArr.includes(ROLES.MANAGER_2)
              )
            }
          })
        }
      }

      // if (menu.key === 'recruitment-manage') {
      //   if (
      //     roleArr.includes(ROLES.ADMIN) ||
      //     roleArr.includes(ROLES.USER) ||
      //     roleArr.includes(ROLES.MANAGER_2) ||
      //     roleArr.includes(ROLES.MANAGER_1)
      //   ) {
      //     menu.hidden = false

      //     if (menu?.subMenu) {
      //       menu.subMenu.forEach((submenu) => {
      //         const roleArr = intersectArray(submenu.roles as string[], role)
      //         console.log(roleArr)

      //         if (submenu.key === 'record-list') {
      //           submenu.hidden = !(roleArr.includes(ROLES.ADMIN) || roleArr.includes(ROLES.USER))
      //         }

      //         if (submenu.key === 'verify-record') {
      //           console.log('run')

      //           submenu.hidden = !(
      //             roleArr.includes(ROLES.ADMIN) ||
      //             roleArr.includes(ROLES.MANAGER_1) ||
      //             roleArr.includes(ROLES.MANAGER_2)
      //           )
      //         }
      //       })
      //     }
      //   } else {
      //     menu.hidden = true
      //   }
      // }
    }
  })
  return menuList
}
