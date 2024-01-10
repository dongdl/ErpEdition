export interface MenuItem {
  name: string
  id: string
  link?: string
  icon?: string
  open?: boolean
  active?: boolean
  subMenu?: MenuItem[]
  hidden?: boolean
  roles?: string[]
  key: string
}
