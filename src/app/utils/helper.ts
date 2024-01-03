import { USER_STATUS, USER_STATUS_2 } from '../model/user';

export const createGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const formatNumber = (value: string | number) => {
  if (value === null) {
    return '0,00';
  }
  const phoneNumber = value + '';
  const list = phoneNumber.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  const decimal =
    list[1]?.length > 1
      ? list[1].slice(0, 2)
      : list[1]?.length === 1
      ? `${list[1]}0`
      : '';
  return `${prefix}${result}${decimal ? `,${decimal}` : ',00'}`;
};

export const mappingStatusUser = (status: USER_STATUS) => {
  switch (status) {
    case USER_STATUS.Active:
      return 'Active';
    case USER_STATUS.InActive:
      return 'Inactive';
    case USER_STATUS.Deleted:
      return 'Deleted';
    case USER_STATUS.Disabled:
      return 'Disabled';
    default:
      return '';
  }
};

export const mappingStatusUser2 = (status: USER_STATUS_2) => {
  switch (status) {
    case USER_STATUS_2.Active:
      return 'Active';
    case USER_STATUS_2.InActive:
      return 'Inactive';
    case USER_STATUS_2.Deleted:
      return 'Deleted';
    case USER_STATUS_2.Disabled:
      return 'Disabled';
    default:
      return '';
  }
};

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
  insuranceNumber: 'Số sổ bảo hiểm',
};

export const mappingStatusRecord = {
  '1': 'Cộng tác viên',
  '2': 'Học việc',
  '3': 'Thử việc',
  '4': 'Chính thức',
  '5': 'Nghỉ việc',
  '6': 'Nghỉ không lương',
  '7': 'Tạm nghỉ hoãn hợp đồng',
  '99': 'Chưa phân loại',
};
