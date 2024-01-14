import { NgIf } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'

import { HttpErrorResponse } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr'
import { catchError, of } from 'rxjs'
import { Employee, Family, HistoryEmployeeItem } from '../../../model/record'
import { ModalComponent } from '../../../shared/components/modal/modal.component'
import { CONTROL_TYPE } from '../../../shared/constant/control-field-type'
import { FormManagementService } from '../../../shared/services/form-management.service'
import { SharedModule } from '../../../shared/shared.module'
import { HistoryRecordComponent } from '../../history-record/history-record.component'
import { AddEditFamilyComponent } from '../add-edit-family/add-edit-family.component'
import { EmployeeRecordService } from '../employee-record.service'
import { UploadFileListComponent } from '../upload-file-list/upload-file-list.component'
import { format } from 'date-fns'

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
  providers: [FormManagementService, EmployeeRecordService]
})
export class AddEditRecordComponent implements OnInit {
  @Input() mode: 'add' | 'view' | 'edit' = 'add'
  @Input() recordCurrent: Employee | null = null
  @Output() closeModal = new EventEmitter<boolean>()
  @Output() changeRecord = new EventEmitter<Employee>()

  familyList: Family[] = []
  history: HistoryEmployeeItem[] = []
  modeModalFamily: 'add' | 'edit' = 'add'
  formRecord: FormGroup = new FormGroup({})
  fieldList!: any

  get ControlType() {
    return CONTROL_TYPE
  }

  constructor(
    private fmService: FormManagementService,
    private employeeServices: EmployeeRecordService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.fmService.createEmployeeRecordFields().subscribe((fields) => {
      this.fieldList = fields
      this.formRecord = this.fmService.toFormGroupEmployeeRecord(this.fieldList)
       if (this.mode === 'view') {
         Object.keys(this.formRecord.controls).forEach((field) => {
           const control = this.formRecord.get(field)
           control?.disable()
         })
       }
      if (this.recordCurrent) {
        this.formRecord.patchValue(this.recordCurrent, { onlySelf: true })
        this.familyList =
          this.recordCurrent?.families?.map((x, idx) => ({ ...x, _id: Date.now() + idx })) || []
        if (!this.recordCurrent?.id) return
        this.employeeServices.getHistoryEmployee(this.recordCurrent?.id).subscribe((list) => {
          this.history = list.map((x) => ({
            ...x,
            createdDate: format(new Date(x.createdDate), 'dd/MM/yyyy HH:mm:ss')
          }))
        })
      }
    })


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

    const value: any = {}
    Object.keys(this.formRecord.value).forEach((key) => {
      if (key && (key.toLowerCase().includes('date') || key.toLowerCase().includes('day'))) {
        if (new Date(this.formRecord.value[key]).toString() !== 'Invalid Date') {
          value[key] = format(new Date(this.formRecord.value[key]), 'yyyy-MM-dd HH:mm:ss')
        } else {
          value[key] = ''
        }
      } else if (key === 'gender') {
        value[key] = this.formRecord.value[key]
      } else if (this.formRecord.value[key] === '0') {
        value[key] = false
      } else if (this.formRecord.value[key] === '1') {
        value[key] = true
      } else {
        value[key] = this.formRecord.value[key]
      }
    })

    if (this.mode === 'add') {
      this.employeeServices
        .createEditEmployee({ ...value, families: this.familyList })
        .pipe(catchError((err) => of(err)))
        .subscribe((res) => {
          if (!(res instanceof HttpErrorResponse)) {
            this.toast.success('Tạo hồ sơ thành công')
            this.changeRecord.emit(res)
          }
        })
    } else {
      this.employeeServices
        .createEditEmployee({ id: this.recordCurrent?.id, ...value, families: this.familyList })
        .pipe(catchError((err) => of(err)))
        .subscribe((res) => {
          if (!(res instanceof HttpErrorResponse)) {
            this.toast.success('Sửa hồ sơ thành công')
            this.changeRecord.emit(res)
          }
        })
    }
  }

  onChangeFamily(family: Family) {
    if (this.modeModalFamily === 'add') {
      this.familyList.unshift({ ...family, _id: Date.now() })
    }

    if (this.modeModalFamily === 'edit') {
      const index = this.familyList.findIndex((x) => x._id === family._id)
      if (index === -1) return
      this.familyList.splice(index, 1, family)
    }
  }

  deleteFamily(record: Family) {
    const index = this.familyList.findIndex((x) => x.id === record.id)
    if (index !== -1) {
      this.familyList.splice(index, 1)
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
}
