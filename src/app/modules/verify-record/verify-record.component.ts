import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IHrRecord } from '../../model/record';
import { USER_STATUS } from '../../model/user';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SharedModule } from '../../shared/shared.module';
import { mappingStatusUser } from '../../utils/helper';
import { AddEditRecordComponent } from '../add-edit-record/add-edit-record.component';
import { HrRecordsService } from '../hr-records/hr-records.service';

@Component({
  selector: 'app-verify-record',
  standalone: true,
  imports: [AddEditRecordComponent, ModalComponent, FormsModule, SharedModule],
  templateUrl: './verify-record.component.html',
  styleUrl: './verify-record.component.css',
})
export class VerifyRecordComponent {
  isModalOpen = false;
  recordList: IHrRecord[] = [];
  chosenRecord: IHrRecord | null = null;
  mode: 'add' | 'edit' | 'view' = 'add';
  searchByUserName = '';
  recordListSubscription: Subscription | null = null;
  firstRender = true;
  formSearch!: FormGroup;
  filterList: IHrRecord[] = [];

  constructor(
    private hrServices: HrRecordsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

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
    this.formSearch = this.fb.group({
      hrCode: [''],
      fullName: [''],
      level: [''],
      departmentCode: [''],
    });
    this.recordListSubscription = this.hrServices.recordList.subscribe(
      (record) => {
        this.recordList = [...record];
        this.filterList = [...record];
      }
    );
    this.activeRoute.queryParams.subscribe((query) => {
      if (this.firstRender) return;
      const { hrCode, fullName, level, departmentCode } = query;
      if (hrCode) {
        this.filterList = this.recordList.filter((record) =>
          record.hrCode.toLowerCase().includes(hrCode.toLowerCase())
        );
      }
      if (fullName) {
        this.filterList = this.recordList.filter((record) =>
          record.fullName.toLowerCase().includes(fullName.toLowerCase())
        );
      }
      if (level) {
        this.filterList = this.recordList.filter((record) =>
          record.level.toLowerCase().includes(level.toLowerCase())
        );
      }
      if (departmentCode) {
        this.filterList = this.recordList.filter((record) =>
          record.departmentCode
            .toLowerCase()
            .includes(departmentCode.toLowerCase())
        );
      }
    });
    this.firstRender = false;
  }

  resetSearchForm() {
    this.router.navigate(['duyet-thong-tin-hai-mat'], {
      queryParams: {},
    });
    this.filterList = [...this.recordList];
    this.formSearch.reset();
  }

  search() {
    this.router.navigate(['duyet-thong-tin-hai-mat'], {
      queryParams: this.formSearch.value,
    });
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
        return 'Sửa thông tin nhân sự';
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
    alert('Duyệt thông tin thành công');
  }
}
