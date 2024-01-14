import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Subscription, catchError, of } from 'rxjs'
import { EMPLOYEE_STATUS, Employee, IHrRecord } from '../../../model/record'
import { ModalComponent } from '../../../shared/components/modal/modal.component'
import { SharedModule } from '../../../shared/shared.module'
import { AuthService } from '../../auth/auth.service'
import { HrRecordsService } from '../../hr-records/hr-records.service'
import { AddEditRecordComponent } from '../add-edit-record/add-edit-record.component'
import { EmployeeRecordService } from '../employee-record.service'
import { RecordTableComponent } from '../record-table/record-table.component'

@Component({
  selector: 'app-record-wait-handle',
  standalone: true,
  imports: [
    AddEditRecordComponent,
    ModalComponent,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RecordTableComponent
  ],
  providers: [EmployeeRecordService],
  templateUrl: './record-wait-handle.component.html',
  styleUrl: './record-wait-handle.component.css'
})
export class RecordWaitHandleComponent implements OnInit, OnDestroy {
  isModalOpen = false
  recordList: Employee[] = []
  chosenRecord: IHrRecord | null = null
  mode: 'add' | 'edit' | 'view' = 'add'
  recordListSubscription: Subscription | null = null
  formSearch!: FormGroup
  recordEdited: Employee | null = null
  firstRender = true
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
    private hrServices: HrRecordsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private employeeService: EmployeeRecordService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.formSearch = this.fb.group({
      hrCode: [''],
      fullName: [''],
      level: [''],
      departmentCode: ['']
    })
    this.getListByRoles()
  }

  getListByRoles() {
    this.employeeService
      .getListEmployeeByRoleAndStatus(EMPLOYEE_STATUS.WAIT_PROCESSING)
      .pipe(catchError((err) => of(err)))
      .subscribe((res) => {
        if (!(res instanceof HttpErrorResponse)) {
          this.recordList = res
        }
      })
  }

  changeStatusEmployeeRequest() {}

  closeModal(value: boolean) {
    this.isModalOpen = value
  }

  addNewRecord() {
    this.mode = 'add'
    this.isModalOpen = true
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
    this.router.navigate(['thong-tin-tuyen-dung'], {
      queryParams: this.formSearch.value
    })
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

  onChangeRecord(record: Employee) {
    if (this.mode === 'add') {
      this.getListByRoles()
    }
    if (this.mode === 'edit') {
      const index = this.recordList.findIndex((item) => item.id === record.id)
      if (index === -1) return
      const updatedRecord = { ...this.recordList[index], ...record }
      this.recordList.splice(index, 1, updatedRecord)
      this.recordEdited = null
    }

    this.isModalOpen = false
  }

  get employeeStatus() {
    return EMPLOYEE_STATUS
  }

  onEditRecord(record: Employee) {
    this.recordEdited = record
    this.isModalOpen = true
    this.mode = 'edit'
  }

  onDelete(id?: number) {
    if (!id) return
    this.hrServices.deleteRecord(id)
    this.resetSearchForm()
  }

  onViewDetail(record: Employee) {
    this.isModalOpen = true
    this.mode = 'view'
    this.recordEdited = record
  }

  approveByUser(employee: Employee) {
    if (!employee?.id || !employee.recruitmentUserTaskId) return
    this.employeeService
      .changeStatus({
        commentCode: '',
        action: 'SUBMIT',
        commentDetail: '',
        employeeId: employee?.id,
        recruitmentUserTaskId: employee.recruitmentUserTaskId,
        commentTitle: ''
      })
      .pipe(catchError((err) => of(err)))
      .subscribe((res) => {
        if (!(res instanceof HttpErrorResponse) && !(res instanceof Error)) {
          this.toast.success('Chuyển duyệt thành công')
          this.getListByRoles()
        }
      })
  }

  closeByUser(employee: Employee) {
    if (!employee?.id || !employee.recruitmentUserTaskId) return
    this.employeeService
      .changeStatus({
        commentCode: '',
        action: 'CLOSE',
        commentDetail: '',
        employeeId: employee?.id,
        recruitmentUserTaskId: employee.recruitmentUserTaskId,
        commentTitle: ''
      })
      .pipe(catchError((err) => of(err)))
      .subscribe((res) => {
        if (!(res instanceof HttpErrorResponse) && !(res instanceof Error)) {
          this.toast.success('Đóng hồ sơ thành công')
          this.getListByRoles()
        }
      })
  }
}
