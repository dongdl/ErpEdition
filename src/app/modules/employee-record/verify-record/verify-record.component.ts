import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
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
    ModalReasonComponent
  ],
  providers: [EmployeeRecordService],
  templateUrl: './verify-record.component.html',
  styleUrl: './verify-record.component.css'
})
export class VerifyRecordComponent implements OnInit, OnDestroy {
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
      key: 'code',
      name: 'Mã nhân viên'
    },
    {
      key: 'fullName',
      name: 'Họ và tên'
    },
    {
      key: 'positionCode',
      name: 'Mã chức danh'
    },
    {
      key: 'level',
      name: 'Cấp bậc'
    },
    {
      key: 'zone',
      name: 'Vùng',
      width: '200px'
    },
    {
      key: 'region',
      name: 'Miền',
      width: '200px'
    },
    {
      key: 'taxCode',
      name: 'Mã số thuế thu nhập cá nhân',
      width: '300px'
    },
    {
      key: 'insuranceNumber',
      name: 'Số sổ bảo hiểm',
      width: '300px'
    },
    {
      key: 'accountNum',
      name: 'Số tài khoản BVB',
      width: '300px'
    },
    {
      key: 'status',
      name: 'Trạng thái',
      width: '140px'
    }
  ]

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeRecordService
  ) {}

  ngOnInit(): void {
    this.getListByRoles()
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

  addNewRecord() {
    this.mode = 'add'
    this.isModalOpenComment = true
  }

  openModal(type: 'reject' | 'agree') {
    this.isModalOpenComment = true
    this.modalType = type
  }

  getListByRoles() {
    this.employeeService
      .getListEmployeeByRoleAndStatus()
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

  openModalComment(record: Employee, type: 'agree' | 'reject') {
    this.modalType = type
    this.isModalOpenComment = true
    this.recordChosen = record
  }
}
