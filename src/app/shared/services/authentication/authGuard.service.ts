import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { HrRecordsService } from '../../../modules/hr-records/hr-records.service'
import { getUserInfoToLS } from '../../../utils/auth'
import { MenuItem } from '../../model/util.model'
import { intersectArray } from '../../../utils/helper'
import { IUserLogin } from '../../../utils/mock-data'

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
    if (role.includes('USER')) {
      router.navigate(['thong-tin-tuyen-dung'])
    } else if (role.includes('MANAGER_LEVEL_1') || role.includes('MANAGER_LEVEL_2')) {
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

  if (!role.includes('ADMIN')) {
    if (role.includes('USER')) {
      router.navigate(['thong-tin-tuyen-dung'])
    } else if (role.includes('MANAGER_LEVEL_1') || role.includes('MANAGER_LEVEL_2')) {
      router.navigate(['duyet-thong-tin-hai-mat'])
    }
    return false
  }
  return true
}

export const recordListGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const user = getUserInfoToLS() as IUserLogin
  const { role } = user
  if (!(role.includes('ADMIN') || role.includes('USER'))) {
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
      role.includes('ADMIN') ||
      role.includes('MANAGER_LEVEL_1') ||
      role.includes('MANAGER_LEVEL_2')
    )
  ) {
    router.navigate(['thong-tin-tuyen-dung'])
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
        if (roleArr.includes('ADMIN')) {
          menu.hidden = false
        } else {
          menu.hidden = true
        }
      }

      if (menu.key === 'recruitment') {
        if (
          roleArr.includes('ADMIN') ||
          roleArr.includes('USER') ||
          roleArr.includes('MANAGER_LEVEL_2') ||
          roleArr.includes('MANAGER_LEVEL_1')
        ) {
          menu.hidden = false

          if (menu?.subMenu) {
            menu.subMenu.forEach((submenu) => {
              const roleArr = intersectArray(submenu.roles as string[], role)

              if (submenu.key === 'record-list') {
                submenu.hidden = !(roleArr.includes('ADMIN') || roleArr.includes('USER'))
              }

              if (submenu.key === 'verify-record') {
                submenu.hidden = !(
                  roleArr.includes('ADMIN') ||
                  roleArr.includes('MANAGER_LEVEL_1') ||
                  roleArr.includes('MANAGER_LEVEL_2')
                )
              }
            })
          }
        } else {
          menu.hidden = true
        }
      }
    }
  })
  return menuList
}
