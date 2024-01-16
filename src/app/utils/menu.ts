import { MenuItem } from '../shared/model/util.model'
import ROLES from './roles'

export const MENU_FULL: MenuItem[] = [
  {
    name: 'Quản lý người dùng',
    id: '0',
    icon: 'icon-users',
    link: '/quan-ly-nguoi-dung',
    roles: [ROLES.ADMIN],
    key: 'user-management'
  },
  {
    name: 'Quản lý nhân sự',
    id: '1',
    icon: 'icon-users',
    active: false,
    open: true,
    key: 'recruitment',
    roles: [ROLES.ADMIN, ROLES.MANAGER_1, ROLES.MANAGER_2, ROLES.USER],
    subMenu: [
      {
        name: 'Quy trình tuyển dụng',
        id: '1-0',
        icon: 'icon-add',
        link: '/thong-tin-tuyen-dung-can-xu-ly',
        active: false,
        open: true,
        key: 'recruitment-manager',
        roles: [ROLES.ADMIN, ROLES.USER],
        subMenu: [
          {
            name: 'Yêu cầu cần xử lý',
            id: '1-0-1',
            icon: 'icon-add',
            link: '/thong-tin-tuyen-dung-can-xu-ly',
            active: false,
            roles: [ROLES.ADMIN, ROLES.USER],
            key: 'record-list'
          },
          // {
          //   name: 'Yêu cầu đang xử lý',
          //   id: '1-0-2',
          //   icon: 'icon-add',
          //   link: '/thong-tin-tuyen-dung-dang-xu-ly',
          //   active: false,
          //   roles: [ROLES.ADMIN, ROLES.USER],
          //   key: 'record-list'
          // },
          {
            name: 'Yêu cầu đã hoàn thành',
            id: '1-0-3',
            icon: 'icon-add',
            link: '/thong-tin-tuyen-dung-hoan-thanh',
            active: false,
            roles: [ROLES.ADMIN, ROLES.USER],
            key: 'record-list'
          }
        ]
      },

      {
        name: 'Quy trình tuyển dụng',
        id: '1-1',
        icon: 'icon-add',
        active: false,
        open: true,
        roles: [ROLES.ADMIN, ROLES.MANAGER_1, ROLES.MANAGER_2],
        key: 'verify',
        subMenu: [
          {
            name: 'Yêu cầu cần xử lý',
            id: '1-1-0',
            icon: 'icon-add',
            link: '/duyet-thong-tin-hai-mat-can-xu-ly',
            active: false,
            roles: [ROLES.ADMIN, ROLES.MANAGER_1, ROLES.MANAGER_2],
            key: 'verify-record'
          },
          // {
          //   name: 'Yêu cầu đang xử lý',
          //   id: '1-1-1',
          //   icon: 'icon-add',
          //   link: '/duyet-thong-tin-hai-mat-dang-xu-ly',
          //   active: false,
          //   roles: [ROLES.ADMIN, ROLES.MANAGER_1, ROLES.MANAGER_2],
          //   key: 'verify-record'
          // },
          {
            name: 'Yêu cầu đã hoàn thành',
            id: '1-1-2',
            icon: 'icon-add',
            link: '/duyet-thong-tin-hai-mat-hoan-thanh',
            active: false,
            roles: [ROLES.ADMIN, ROLES.MANAGER_1, ROLES.MANAGER_2],
            key: 'verify-record'
          }
        ]
      }
    ]
  }
]
