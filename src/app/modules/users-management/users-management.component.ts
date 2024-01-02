import { Component } from '@angular/core';
import users from '../../utils/users.json';
import { mappingStatusUser } from '../../utils/helper';
import { IUser, USER_STATUS } from '../../model/user';
import { NgClass } from '@angular/common';
import { AddEditUserFormComponent } from './add-edit-user-form/add-edit-user-form.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [NgClass, AddEditUserFormComponent, ModalComponent, SharedModule],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css',
})
export class UsersManagementComponent {
  isModalOpen = false;
  users: IUser[] = users;
  editedUser: IUser | null = null;
  mode: 'add' | 'edit' = 'add';

  get STATUS() {
    return USER_STATUS;
  }

  generateStatusUser(status: USER_STATUS) {
    return mappingStatusUser(status);
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
