import { Component, OnDestroy, OnInit } from '@angular/core';
import { IHrRecord } from '../../model/record';
import { HrRecordsService } from '../hr-records/hr-records.service';
import { USER_STATUS } from '../../model/user';
import { mappingStatusUser } from '../../utils/helper';
import { Subscription, catchError, of } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { AddEditRecordComponent } from '../add-edit-record/add-edit-record.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-confirm-record',
  standalone: true,
  imports: [
    AddEditRecordComponent,
    ModalComponent,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  templateUrl: './confirm-record.component.html',
  styleUrl: './confirm-record.component.css',
})
export class ConfirmRecordComponent {
  isModalOpen = false;
  recordList: IHrRecord[] = [];
  filterList: IHrRecord[] = [];
  chosenRecord: IHrRecord | null = null;
  mode: 'add' | 'edit' | 'view' = 'add';
  searchByUserName = '';
  recordListSubscription: Subscription | null = null;
  firstRender = true;
  formSearch!: FormGroup;

  constructor(
    private hrServices: HrRecordsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService
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
    this.formSearch = this.fb.group({
      hrCode: [''],
      fullName: [''],
      level: [''],
      departmentCode: [''],
    });
    this.firstRender = false;
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

  search() {
    this.router.navigate(['xac-nhan-thong-tin'], {
      queryParams: this.formSearch.value,
    });
  }

  resetSearchForm() {
    this.router.navigate(['xac-nhan-thong-tin'], {
      queryParams: {},
    });
    this.filterList = [...this.recordList];
    this.formSearch.reset();
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
    this.auth
      .confirmCurrentTask()
      .pipe(catchError((err) => of(err)))
      .subscribe(() => {
        this.router.navigate(['duyet-thong-tin-hai-mat']);
      });
  }

  onSendMail() {
    alert('gửi mail thành công');
  }

  onReturn(id?: number) {
    if (!id) return;
    this.recordList = this.recordList.filter((item) => item.id !== id);
  }
}
