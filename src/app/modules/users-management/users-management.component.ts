import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { IUser, USER_STATUS_2 } from '../../model/user';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { mappingStatusUser2 } from '../../utils/helper';
import users from '../../utils/userList.json';
import { AddEditUserFormComponent } from './add-edit-user-form/add-edit-user-form.component';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [NgClass, AddEditUserFormComponent, ModalComponent],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css',
})
export class UsersManagementComponent {
  isModalOpen = false;
  users: any[] = users;
  editedUser: IUser | null = null;
  mode: 'add' | 'edit' = 'add';

  get STATUS() {
    return USER_STATUS_2;
  }

  generateStatusUser(status: USER_STATUS_2) {
    return mappingStatusUser2(status);
  }

  closeModal(value: boolean) {
    this.isModalOpen = value;
  }

  addNewUser() {
    this.mode = 'add';
    this.isModalOpen = true;
  }
  editUser(user: IUser) {
    this.mode = 'edit';
    this.editedUser = user;
    this.isModalOpen = true;
  }

  updateOrAddUser(user: IUser) {
    if (this.mode === 'edit' && this.editedUser !== null) {
      const updatedUser = users.find((user) => user.id === this.editedUser?.id);
      if (!updatedUser) return;
      Object.assign(updatedUser, user);
      this.editedUser = null;
    }
    if (this.mode === 'add') {
      this.users.unshift({ id: Date.now(), ...user });
    }
    this.mode = 'add';
    this.isModalOpen = false;
  }
}
