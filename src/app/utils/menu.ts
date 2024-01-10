import { MenuItem } from '../shared/model/util.model'

export const MENU_FULL: MenuItem[] = [
  {
    name: 'Quản lý người dùng',
    id: '7',
    icon: 'icon-users',
    link: '/quan-ly-nguoi-dung',
    roles: ['ADMIN'],
    key: 'user-management'
  },
  {
    name: 'Quy trình tuyển dụng',
    id: '1',
    icon: 'icon-users',
    active: false,
    open: true,
    key: 'recruitment',
    roles: ['ADMIN', 'USER', 'MANAGER_LEVEL_2', 'MANAGER_LEVEL_1'],
    subMenu: [
      {
        name: 'Thông tin tuyển dụng',
        id: '1-1',
        icon: 'icon-add',
        link: '/thong-tin-tuyen-dung',
        active: false,
        roles: ['ADMIN', 'USER'],
        key: 'record-list'
      },
      {
        name: 'Duyệt thông tin',
        id: '1-3',
        icon: 'icon-add',
        link: '/duyet-thong-tin-hai-mat',
        active: false,
        roles: ['MANAGER_LEVEL_2', 'MANAGER_LEVEL_1', 'ADMIN'],
        key: 'verify-record'
      }
    ]
  }
]
