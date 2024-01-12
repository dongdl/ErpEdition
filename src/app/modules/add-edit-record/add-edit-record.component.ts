import { NgIf } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'

import { Router } from '@angular/router'
import { catchError, of } from 'rxjs'
import { Employee } from '../../model/record'
import { ModalComponent } from '../../shared/components/modal/modal.component'
import { CONTROL_TYPE } from '../../shared/constant/control-field-type'
import { FormManagementService } from '../../shared/services/form-management.service'
import { SharedModule } from '../../shared/shared.module'
import ma_chuc_danh from '../../utils/ma_chuc_danh.json'
import ma_don_vi from '../../utils/ma_don_vi.json'
import ma_nhan_su from '../../utils/ma_nhan_su.json'
import { AddEditFamilyComponent } from '../add-edit-family/add-edit-family.component'
import { AuthService } from '../auth/auth.service'
import { HistoryRecordComponent } from '../history-record/history-record.component'
import { UploadFileListComponent } from '../upload-file-list/upload-file-list.component'

@Component({
  selector: 'app-add-edit-record',
  standalone: true,
  imports: [
    ModalComponent,
    NgIf,
    ReactiveFormsModule,
    SharedModule,
    AddEditFamilyComponent,
    HistoryRecordComponent,
    UploadFileListComponent
  ],
  templateUrl: './add-edit-record.component.html',
  styleUrl: './add-edit-record.component.css',
  providers: [FormManagementService]
})
export class AddEditRecordComponent implements OnInit {
  @Input() mode: 'add' | 'view' | 'edit' = 'add'
  @Input() recordCurrent: Employee | null = null
  @Output() closeModal = new EventEmitter<boolean>()

  @Output() changeRecord = new EventEmitter<Employee>()

  formRecord!: FormGroup
  // previewRecordSubscription: SubscriptionLike | null = null;
  fieldList!: any

  get CODE_LIST() {
    return ma_nhan_su.map((item) => ({
      title: item.option,
      value: item.option
    }))
  }

  get ControlType() {
    return CONTROL_TYPE
  }

  get isDisabled() {
    return this.mode === 'view'
  }

  get POSITION_CODE() {
    return ma_chuc_danh.map((item) => ({
      title: item.option,
      value: item.option
    }))
  }

  get GENDER() {
    return [
      {
        title: 'Nam',
        value: '1'
      },
      {
        title: 'Nữ',
        value: '2'
      }
    ]
  }

  get MARTIAL_STATUS() {
    return [
      {
        title: 'Đã kết hôn',
        value: '1'
      },
      {
        title: 'Chưa kết hôn',
        value: '2'
      }
    ]
  }

  get DEPARTMENT_CODE() {
    return ma_don_vi.map((item) => ({
      title: item.option,
      value: item.option
    }))
  }

  get STATUS() {
    return [
      { title: 'Cộng tác viên', value: '1' },
      { title: 'Học việc', value: '2' },
      { title: 'Thử việc', value: '3' },
      { title: 'Chính thức', value: '4' },
      { title: 'Nghỉ việc', value: '5' },
      { title: 'Nghỉ không lương', value: '6' },
      { title: 'Nghỉ không lương đồng', value: '7' },
      { title: 'Chưa phân loạig', value: '99' }
    ]
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private fmService: FormManagementService
  ) {}

  ngOnInit(): void {
    this.fieldList = this.fmService.createEmployeeRecordFields()

    this.formRecord = this.fmService.toFormGroupEmployeeRecord(this.fieldList)
    if (this.recordCurrent) this.formRecord.patchValue(this.recordCurrent, { onlySelf: true })

    if (this.mode === 'view') {
      Object.keys(this.formRecord.controls).forEach((field) => {
        const control = this.formRecord.get(field)
        control?.disable()
      })
    }
  }

  getFormControl(key: string) {
    return this.formRecord.get(key)
  }

  onSubmit() {
    if (this.mode === 'view') return
    Object.keys(this.formRecord.controls).forEach((field) => {
      const control = this.formRecord.get(field)
      control?.markAsDirty({ onlySelf: true })
    })
    if (this.formRecord.invalid) return
    if (this.mode === 'add') {
      this.changeRecord.emit(this.formRecord.value)
    } else {
      console.log(this.formRecord.value)

      this.changeRecord.emit({
        ...this.formRecord.value,
        id: this.recordCurrent?.id
      })
    }
    this.closeModal.emit(false)
  }

  onVerifyRecord() {
    if (this.mode === 'view') {
    }
  }

  onResetForm() {
    this.formRecord.reset()
  }

  onSend() {
    this.closeModal.emit(false)
  }
  onClickAdd() {
    this.closeModal.emit(false)
  }

  get isConfirmRecord() {
    return this.router.url === '/xac-nhan-thong-tin'
  }

  get isVerifyRecord() {
    return this.router.url === '/duyet-thong-tin-hai-mat'
  }

  onSendEmail() {
    alert('gửi email thành công')
  }

  agree(id?: number) {
    if (!id) return

    this.auth
      .confirmCurrentTask(id)
      .pipe(catchError((err) => of(err)))
      .subscribe(() => {
        alert('Duyệt thong tin thành công')
        this.closeModal.emit(false)
      })

    // alert('Duyệt thong tin thành công');
    // this.closeModal.emit(false);
  }

  toConfirm(id?: number) {
    if (!id) return
    this.auth
      .confirmCurrentTask(id)
      .pipe(catchError((err) => of(err)))
      .subscribe(() => {})

    // if (this.router.url === '/thong-tin-tuyen-dung') {
    //   this.router.navigate(['xac-nhan-thong-tin']);
    // }
    // if (this.router.url === '/xac-nhan-thong-tin') {
    //   this.router.navigate(['duyet-thong-tin-hai-mat']);
    // }

    // if(this.route.pathFromRoot)
    // this.router.navigate(['xac-nhan-thong-tin']);
  }
}
