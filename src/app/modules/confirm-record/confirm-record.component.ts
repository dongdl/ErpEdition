import { Component, OnDestroy, OnInit } from '@angular/core';
import { IHrRecord } from '../../model/record';
import { HrRecordsService } from '../hr-records/hr-records.service';
import { USER_STATUS } from '../../model/user';
import { mappingStatusUser } from '../../utils/helper';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { AddEditRecordComponent } from '../add-edit-record/add-edit-record.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-record',
  standalone: true,
  imports: [AddEditRecordComponent, ModalComponent, FormsModule, SharedModule],
  templateUrl: './confirm-record.component.html',
  styleUrl: './confirm-record.component.css',
})
export class ConfirmRecordComponent {
  isModalOpen = false;
  recordList: IHrRecord[] = [];
  chosenRecord: IHrRecord | null = null;
  mode: 'add' | 'edit' | 'view' = 'add';
  searchByUserName = '';
  recordListSubscription: Subscription | null = null;

  constructor(private hrServices: HrRecordsService, private router: Router) {}

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

  ngOnInit(): void {
    this.recordListSubscription = this.hrServices.recordList.subscribe(
      (record) => {
        this.recordList = record;
      }
    );
  }

  ngOnDestroy(): void {
    this.recordListSubscription?.unsubscribe();
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

  onChangeRecord(record: IHrRecord) {
    if (this.mode === 'add') {
      this.hrServices.addRecord({ id: Date.now(), ...record });
    }
    if (this.mode === 'edit') {
      let updatedRecord = this.recordList.find((item) => item.id === record.id);
      if (!updatedRecord) return;
      this.hrServices.editRecord(record, updatedRecord?.id as number);
    }
    this.isModalOpen = false;
  }

  onEditRecord(record: IHrRecord) {
    this.isModalOpen = true;
    this.mode = 'edit';
    this.hrServices.sendRecord(record);
  }
  onDelete(id: number) {
    this.hrServices.deleteRecord(id);
  }
  onViewDetail(record: IHrRecord) {
    this.isModalOpen = true;
    this.mode = 'view';
    this.hrServices.sendRecord(record);
  }

  toConfirm() {
    this.router.navigate(['duyet-thong-tin-hai-mat']);
  }

  onSendMail() {
    alert('gửi mail thành công');
  }

  onReturn(id: number) {
    this.recordList = this.recordList.filter((item) => item.id !== id);
  }
}
