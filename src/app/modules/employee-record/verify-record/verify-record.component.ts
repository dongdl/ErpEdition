import { HttpErrorResponse } from '@angular/common/http'
import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription, catchError, of } from 'rxjs'
import { EMPLOYEE_STATUS, Employee, IHrRecord } from '../../../model/record'
import { ModalComponent } from '../../../shared/components/modal/modal.component'
import { SharedModule } from '../../../shared/shared.module'
import { getUserInfoToLS } from '../../../utils/auth'
import { IUserLogin } from '../../../utils/mock-data'
import ROLES from '../../../utils/roles'
import { AddEditRecordComponent } from '../add-edit-record/add-edit-record.component'
import { EmployeeRecordService } from '../employee-record.service'
import { ModalReasonComponent } from '../modal-reason/modal-reason.component'
import { RecordTableComponent } from '../record-table/record-table.component'
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm.component'
import { ButtonComponent } from '../../../shared/components/button/button.component'

@Component({
  selector: 'app-verify-record',
  standalone: true,
  imports: [
    AddEditRecordComponent,
    ModalComponent,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RecordTableComponent,
    ModalReasonComponent,
    ModalConfirmComponent,
    ButtonComponent
  ],
  providers: [EmployeeRecordService],
  templateUrl: './verify-record.component.html',
  styleUrl: './verify-record.component.css'
})
export class VerifyRecordComponent implements OnInit, OnDestroy {
  @Input({ required: true }) status!: EMPLOYEE_STATUS
  isModalOpenComment = false
  isModalEmployee = false

  recordList: Employee[] = []
  chosenRecord: IHrRecord | null = null
  mode: 'add' | 'edit' | 'view' = 'add'
  recordListSubscription: Subscription | null = null
  formSearch!: FormGroup
  recordChosen: Employee | null = null
  firstRender = true
  modalType: 'agree' | 'reject' = 'agree'
  tableHeader: { key: keyof Employee; name: string; width?: string }[] = [
    {
      key: 'fullName',
      name: 'Họ và tên',
      width: '30%'
    },
    {
      key: 'code',
      name: 'Mã nhân viên',
      width: '30%'
    },

    {
      key: 'positionCode',
      name: 'Chức danh',
      width: '20%'
    },
    {
      key: 'departmentCode',
      name: 'Phòng ban',
      width: '20%'
    }
    // {
    //   key: 'subStatus',
    //   name: 'Trạng thái',
    //   width: '20%'
    // }
  ]

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeRecordService
  ) {}

  ngOnInit(): void {
    this.getListByRoles(this.status)
    this.formSearch = this.fb.group({
      hrCode: [''],
      fullName: [''],
      level: [''],
      departmentCode: ['']
    })
  }

  closeModal(value: boolean) {
    this.isModalOpenComment = value
  }

  approveDone() {
    this.getListByRoles(this.status)
    if (this.isModalEmployee) {
      this.isModalEmployee = false
    }
  }

  addNewRecord() {
    this.mode = 'add'
    this.isModalOpenComment = true
  }

  openModal(type: 'reject' | 'agree') {
    this.isModalOpenComment = true
    this.modalType = type
  }

  getListByRoles(status: EMPLOYEE_STATUS) {
    this.employeeService
      .getListEmployeeByRoleAndStatus(status)
      .pipe(catchError((err) => of(err)))
      .subscribe((res) => {
        if (!(res instanceof HttpErrorResponse)) {
          this.recordList = res
        }
      })
  }

  getFormControl(field: string) {
    return this.formSearch.get(field)
  }

  ngOnDestroy(): void {
    this.recordListSubscription?.unsubscribe()
  }

  resetSearchForm() {
    this.router.navigate(['thong-tin-tuyen-dung'], {
      queryParams: {}
    })
    // this.filterList = [...this.recordList]
    this.formSearch.reset()
  }

  search() {
    // this.router.navigate(['thong-tin-tuyen-dung'], {
    //   queryParams: this.formSearch.value
    // })
  }

  get modalTitle() {
    switch (this.mode) {
      case 'add': {
        return 'Thêm thông tin tuyển dụng'
      }
      case 'edit': {
        return 'Sửa thông tin tuyển dụng'
      }
      case 'view': {
        return 'Chi tiết thông tin nhân sự'
      }
    }
  }

  get isManager1() {
    const roles = (getUserInfoToLS() as IUserLogin).role
    return roles.includes(ROLES.MANAGER_1)
  }

  get isManager2() {
    const roles = (getUserInfoToLS() as IUserLogin).role
    return roles.includes(ROLES.MANAGER_2)
  }

  get isAdmin() {
    const roles = (getUserInfoToLS() as IUserLogin).role
    return roles.includes(ROLES.ADMIN)
  }

  get employeeStatus() {
    return EMPLOYEE_STATUS
  }

  onViewDetail(record: Employee) {
    this.isModalEmployee = true
    this.mode = 'view'
    this.recordChosen = record
  }

  openModalComment(record: Employee) {
    this.isModalOpenComment = true
    this.recordChosen = record
  }
}
