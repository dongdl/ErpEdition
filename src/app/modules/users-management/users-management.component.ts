import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { IHrRecord } from '../../model/record';
import { USER_STATUS } from '../../model/user';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SharedModule } from '../../shared/shared.module';
import { mappingStatusUser } from '../../utils/helper';
import users from '../../utils/users.json';
import { HrRecordsService } from '../hr-records/hr-records.service';
import { AddEditUserFormComponent } from './add-edit-user-form/add-edit-user-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [
    NgClass,
    AddEditUserFormComponent,
    ModalComponent,
    SharedModule,
    FormsModule,
  ],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css',
})
export class UsersManagementComponent {
  isModalOpen = false;
  recordList: IHrRecord[] = users;
  chosenRecord: IHrRecord | null = null;
  mode: 'add' | 'edit' | 'view' = 'add';
  searchByUserName = '';

  constructor(private hrServices: HrRecordsService) {}

  get STATUS() {
    return USER_STATUS;
  }

  generateStatusUser(status: USER_STATUS) {
    return mappingStatusUser(status);
  }

  closeModal(value: boolean) {
    this.isModalOpen = value;
  }

  addNewRecord() {
    this.mode = 'add';
    this.isModalOpen = true;
  }

  get modalTitle() {
    switch (this.mode) {
      case 'add': {
        return 'Thêm thông tin nhân sự';
      }
      case 'edit': {
        return 'Chỉnh thông tin nhân sự';
      }
      case 'view': {
        return 'Xác nhận thông tin nhân sự';
      }
    }
  }

  //   updateOrAddUser(user: IUser) {
  //     if (this.mode === 'edit' && this.editedUser !== null) {
  //       const updatedUser = users.find((user) => user.id === this.editedUser?.id);
  //       if (!updatedUser) return;
  //       Object.assign(updatedUser, user);
  //       this.editedUser = null;
  //     }
  //     if (this.mode === 'add') {
  //       this.recordList.unshift({ id: Date.now(), ...user });
  //     }
  //     this.mode = 'add';
  //     this.isModalOpen = false;
  //   }
  // }

  onChangeRecord(record: IHrRecord) {
    if (this.mode === 'add') {
      this.recordList.unshift({ id: Date.now(), ...record });
    }
    if (this.mode === 'edit') {
      let updatedRecord = this.recordList.find((item) => item.id === record.id);
      if (!updatedRecord) return;
      updatedRecord = { ...updatedRecord, ...record };
    }
    this.isModalOpen = false;
  }

  confirmRecord(record: IHrRecord) {
    this.isModalOpen = true;
    this.mode = 'view';
    this.hrServices.sendRecord(record);
  }
}
