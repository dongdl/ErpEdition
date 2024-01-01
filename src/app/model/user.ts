export enum USER_STATUS {
  Active = 1,
  InActive = 2,
  Disabled = 3,
  Deleted = 99,
}

export interface IUser {
  id?: number;
  displayName: string;
  username: string;
  fullName: string;
  status: USER_STATUS;
  description: string;
}
