import { MenuItem } from '../shared/model/util.model'
import ROLES from './roles'

export const MENU_FULL: MenuItem[] = [
  {
    name: 'Quản lý người dùng',
    id: '7',
    icon: 'icon-users',
    link: '/quan-ly-nguoi-dung',
    roles: [ROLES.ADMIN],
    key: 'user-management'
  },
  {
    name: 'Quy trình tuyển dụng',
    id: '1',
    icon: 'icon-users',
    active: false,
    open: true,
    key: 'recruitment',
    roles: [ROLES.ADMIN, ROLES.MANAGER_1, ROLES.MANAGER_2, ROLES.USER],
    subMenu: [
      {
        name: 'Thông tin tuyển dụng cần xử lý',
        id: '1-1',
        icon: 'icon-add',
        link: '/thong-tin-tuyen-dung-can-xu-ly',
        active: false,
        roles: [ROLES.ADMIN, ROLES.USER],
        key: 'record-list'
      },
      {
        name: 'Thông tin tuyển dụng đang xử lý',
        id: '1-1',
        icon: 'icon-add',
        link: '/thong-tin-tuyen-dung-dang-xu-ly',
        active: false,
        roles: [ROLES.ADMIN, ROLES.USER],
        key: 'record-list'
      },
      {
        name: 'Thông tin tuyển dụng hoàn thành',
        id: '1-1',
        icon: 'icon-add',
        link: '/thong-tin-tuyen-dung-hoan-thanh',
        active: false,
        roles: [ROLES.ADMIN, ROLES.USER],
        key: 'record-list'
      },
      {
        name: 'Duyệt thông tin',
        id: '1-3',
        icon: 'icon-add',
        link: '/duyet-thong-tin-hai-mat',
        active: false,
        roles: [ROLES.ADMIN, ROLES.MANAGER_1, ROLES.MANAGER_2],
        key: 'verify-record'
      }
    ]
  }
]
