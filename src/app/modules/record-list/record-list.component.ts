import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription, catchError, of } from 'rxjs'
import { Employee, IHrRecord } from '../../model/record'
import { USER_STATUS } from '../../model/user'
import { ModalComponent } from '../../shared/components/modal/modal.component'
import { SharedModule } from '../../shared/shared.module'
import { mappingStatusUser } from '../../utils/helper'
import recordListJson from '../../utils/users.json'
import { AddEditRecordComponent } from '../add-edit-record/add-edit-record.component'
import { AuthService } from '../auth/auth.service'
import { HrRecordsService } from '../hr-records/hr-records.service'
import { RecordTableComponent } from '../record-table/record-table.component'

@Component({
  selector: 'app-record-list',
  standalone: true,
  imports: [
    AddEditRecordComponent,
    ModalComponent,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RecordTableComponent
  ],
  templateUrl: './record-list.component.html',
  styleUrl: './record-list.component.css'
})
export class RecordListComponent implements OnInit, OnDestroy {
  isModalOpen = false
  recordList: Employee[] = recordListJson
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
    private auth: AuthService
  ) {}

  get STATUS() {
    return USER_STATUS
  }

  generateStatusUser(status: USER_STATUS) {
    return mappingStatusUser(status)
  }

  closeModal(value: boolean) {
    this.isModalOpen = value
  }

  addNewRecord() {
    this.mode = 'add'
    this.isModalOpen = true
  }

  ngOnInit(): void {
    // this.recordListSubscription = this.hrServices.recordList.subscribe((record) => {
    //   this.recordList = [...record]
    //   this.filterList = [...record]
    // })
    // this.activeRoute.queryParams.subscribe((query) => {
    //   if (this.firstRender) return
    //   const { hrCode, fullName, level, departmentCode } = query
    //   if (hrCode) {
    //     this.filterList = this.recordList.filter((record) =>
    //       record.hrCode.toLowerCase().includes(hrCode.toLowerCase())
    //     )
    //   }
    //   if (fullName) {
    //     this.filterList = this.recordList.filter((record) =>
    //       record.fullName.toLowerCase().includes(fullName.toLowerCase())
    //     )
    //   }
    //   if (level) {
    //     this.filterList = this.recordList.filter((record) =>
    //       record.level.toLowerCase().includes(level.toLowerCase())
    //     )
    //   }
    //   if (departmentCode) {
    //     this.filterList = this.recordList.filter((record) =>
    //       record.departmentCode.toLowerCase().includes(departmentCode.toLowerCase())
    //     )
    //   }
    // })

    this.formSearch = this.fb.group({
      hrCode: [''],
      fullName: [''],
      level: [''],
      departmentCode: ['']
    })
    this.firstRender = false
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
