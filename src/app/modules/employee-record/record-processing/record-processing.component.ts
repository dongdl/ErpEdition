import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription, catchError, of } from 'rxjs'
import { EMPLOYEE_STATUS, Employee, IHrRecord } from '../../../model/record'
import { ModalComponent } from '../../../shared/components/modal/modal.component'
import { SharedModule } from '../../../shared/shared.module'
import { AuthService } from '../../auth/auth.service'
import { HrRecordsService } from '../../hr-records/hr-records.service'
import { AddEditRecordComponent } from '../add-edit-record/add-edit-record.component'
import { EmployeeRecordService } from '../employee-record.service'
import { RecordTableComponent } from '../record-table/record-table.component'
import { FormManagementService } from '../../../shared/services/form-management.service'
import { ButtonComponent } from '../../../shared/components/button/button.component'

@Component({
  selector: 'app-record-processing',
  standalone: true,
  imports: [
    AddEditRecordComponent,
    ModalComponent,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RecordTableComponent,
    ButtonComponent
  ],
  providers: [EmployeeRecordService, FormManagementService],
  templateUrl: './record-processing.component.html',
  styleUrl: './record-processing.component.css'
})
export class RecordProcessingComponent implements OnInit, OnDestroy {
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
    },
    {
      key: 'subStatus',
      name: 'Trạng thái',
      width: '20%'
    }
  ]

  constructor(
    private hrServices: HrRecordsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
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

  getListByRoles() {
    this.employeeService
      .getListEmployeeByRoleAndStatus(EMPLOYEE_STATUS.PROCESSING)
      .pipe(catchError((err) => of(err)))
      .subscribe((res) => {
        if (!(res instanceof HttpErrorResponse)) {
          this.recordList = res
        }
      })
  }

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
      this.recordList.unshift({ ...record, id: Date.now() })
    }
    if (this.mode === 'edit') {
      const index = this.recordList.findIndex((item) => item.id === record.id)
      if (index === -1) return
      const updatedRecord = { ...this.recordList[index], ...record }
      this.recordList.splice(index, 1, updatedRecord)
      this.recordEdited = null
    }

    // if (this.mode === 'add') {
    //   const id = Date.now()
    //   this.hrServices.addRecord({ id, ...record })
    //   this.auth
    //     .startTask(id)
    //     .pipe(catchError((err) => of(err)))
    //     .subscribe(() => {})
    // }
    // if (this.mode === 'edit') {
    //   let updatedRecord = this.recordList.find((item) => item?.id === record?.id)
    //   if (!updatedRecord) return
    //   this.hrServices.editRecord(record, updatedRecord?.id as number)
    // }
    // this.resetSearchForm()
    this.isModalOpen = false
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

  toConfirm(id?: number) {
    if (!id) return
    this.auth
      .confirmCurrentTask(id)
      .pipe(catchError((err) => of(err)))
      .subscribe(() => {
        alert('Chuyển duyệt thành công')
      })
  }
}
