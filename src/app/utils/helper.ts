import { EMPLOYEE_STATUS } from '../model/record'
import { USER_STATUS, USER_STATUS_2 } from '../model/user'
import { format } from 'date-fns'

export const createGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const formatNumber = (value: string | number) => {
  if (value === null) {
    return '0,00'
  }
  const phoneNumber = value + ''
  const list = phoneNumber.split('.')
  const prefix = list[0].charAt(0) === '-' ? '-' : ''
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ''
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  const decimal =
    list[1]?.length > 1 ? list[1].slice(0, 2) : list[1]?.length === 1 ? `${list[1]}0` : ''
  return `${prefix}${result}${decimal ? `,${decimal}` : ',00'}`
}

export const mappingStatusUser = (status: USER_STATUS) => {
  switch (status) {
    case USER_STATUS.Active:
      return 'Active'
    case USER_STATUS.InActive:
      return 'Inactive'
    case USER_STATUS.Deleted:
      return 'Deleted'
    case USER_STATUS.Disabled:
      return 'Disabled'
    default:
      return ''
  }
}

export const mappingStatusUser2 = (status: USER_STATUS_2) => {
  switch (status) {
    case USER_STATUS_2.Active:
      return 'Active'
    case USER_STATUS_2.InActive:
      return 'Inactive'
    case USER_STATUS_2.Deleted:
      return 'Deleted'
    case USER_STATUS_2.Disabled:
      return 'Disabled'
    default:
      return ''
  }
}

export const generateStatusStyleAndText = (status: string) => {
  switch (status) {
    case 'NEW':
      return {
        class:
          'tw-px-2 tw-py-2 tw-flex tw-items-center tw-justify-center !tw-rounded-md tw-bg-green-500 tw-text-white !tw-text-base',
        text: 'Tạo mới'
      }
    case EMPLOYEE_STATUS.WAIT_PROCESSING:
      return {
        class:
          'tw-px-2 tw-py-2 tw-flex tw-items-center tw-justify-center !tw-rounded-md tw-bg-primary tw-text-white !tw-text-base',
        text: 'Trả về '
      }

    default:
      return {
        class:
          'tw-px-2 tw-py-2 tw-flex tw-items-center tw-justify-center !tw-rounded-md tw-bg-black/50 tw-text-white !tw-text-base',
        text: 'Tạo mới'
      }
  }
}

export const mappingInfo = {
  fullName: 'Họ và tên',
  hrCode: 'Mã nhân sự',
  positionCode: 'Mã vị trí',
  level: 'Cấp bậc',
  departmentCode: 'Mã đơn vị',
  zone: 'Vùng',
  region: 'Miền',
  taxCode: 'Mã số thuế thu nhập cá nhân',
  bankAccount: 'Số tài khoản BVB',
  status: 'Trạng thái',
  insuranceNumber: 'Số sổ bảo hiểm'
}

export const mappingStatusRecord = {
  '1': 'Cộng tác viên',
  '2': 'Học việc',
  '3': 'Thử việc',
  '4': 'Chính thức',
  '5': 'Nghỉ việc',
  '6': 'Nghỉ không lương',
  '7': 'Tạm nghỉ hoãn hợp đồng',
  '99': 'Chưa phân loại'
}

export const intersectArray = (a1: any[], a2: any[], ...rest: any[]): any => {
  const a12 = a1.filter((value) => a2.includes(value))
  if (rest.length === 0) {
    return a12
  }
  return intersectArray(a12, ...(rest as [any, any]))
}

export function formatBytes(bytes: any, decimals = 2) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + ' GB'
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + ' MB'
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + ' KB'
  } else if (bytes > 1) {
    bytes = bytes + ' bytes'
  } else if (bytes == 1) {
    bytes = bytes + ' byte'
  } else {
    bytes = '0 bytes'
  }
  return bytes
}

export function formatDate(date: Date, fm = 'dd/MM/yyyy') {
  return format(date, fm)
}
