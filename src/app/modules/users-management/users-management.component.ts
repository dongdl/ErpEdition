import { Component } from '@angular/core';
import users from '../../utils/users.json';
import { mappingStatusUser } from '../../utils/helper';
import { IUser, USER_STATUS } from '../../model/user';
import { NgClass } from '@angular/common';
import { AddEditUserFormComponent } from './add-edit-user-form/add-edit-user-form.component';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [NgClass, AddEditUserFormComponent],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css',
})
export class UsersManagementComponent {
  users: IUser[] = users;

  get STATUS() {
    return USER_STATUS;
  }

  generateStatusUser(status: USER_STATUS) {
    return mappingStatusUser(status);
  }
}
