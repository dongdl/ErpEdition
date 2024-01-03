import { USER_STATUS } from './user';

export interface IHrRecord {
  id?: number;
  username?: string;
  displayName?: string;
  fullName: string;
  hrCode: string;
  positionCode: string;
  level: string;
  departmentCode: string;
  zone: string;
  region: string;
  taxCode: string;
  bankAccount: string;
  status: USER_STATUS;
  insuranceNumber: string;
}
