import { Component } from '@angular/core';
import { IHrRecord } from '../../model/record';
import { USER_STATUS } from '../../model/user';
import { SharedModule } from '../../shared/shared.module';
import { mappingStatusUser } from '../../utils/helper';
import users from '../../utils/users.json';
import { HrRecordsService } from '../hr-records/hr-records.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-record',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './verify-record.component.html',
  styleUrl: './verify-record.component.css',
})
export class VerifyRecordComponent {
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

  onChangeRecord(record: IHrRecord) {
    if (this.mode === 'add') {
      this.recordList.unshift({ id: Date.now(), ...record });
    }

    if (this.mode === 'edit') {
      const updatedRecord = this.recordList.find(
        (item) => item.id === record.id
      );
      if (!updatedRecord) return;
      Object.assign(updatedRecord, record);
    }
    this.isModalOpen = false;
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
  confirmRecord() {
    alert('Duyệt thông tin thành công');
  }
  editRecord(record: IHrRecord) {
    this.isModalOpen = true;
    this.mode = 'edit';
    this.hrServices.sendRecord(record);
  }
}
