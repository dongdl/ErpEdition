import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { catchError, of } from 'rxjs'
import { Employee } from '../../../model/record'
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm.component'
import { ModalComponent } from '../../../shared/components/modal/modal.component'
import { getUserInfoToLS } from '../../../utils/auth'
import { IUserLogin } from '../../../utils/mock-data'
import ROLES from '../../../utils/roles'
import { EmployeeRecordService } from '../employee-record.service'

@Component({
  selector: 'app-modal-reason',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule, ModalConfirmComponent],
  providers: [EmployeeRecordService],
  templateUrl: './modal-reason.component.html',
  styleUrl: './modal-reason.component.css'
})
export class ModalReasonComponent implements OnInit {
  @Input() modalType: 'agree' | 'reject' = 'agree'
  @Input() employeeChosen: Employee | null = null
  @Output() close = new EventEmitter<boolean>()
  @Output() changeStatusDone = new EventEmitter<any>()
  isOpenModalConfirm = false
  confirmType: 'submit' | 'close' = 'submit'
  form: FormGroup = new FormGroup({})

  constructor(
    private employeeService: EmployeeRecordService,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.isManager2) {
      this.form = this.fb.group({
        type: ['0'],
        commentDetail: ['']
      })
      this.form.valueChanges.subscribe((value) => {
        if ('type' in value) {
          if (value.type === '0') {
            this.form.get('commentDetail')?.setValidators(Validators.required)
          } else {
            this.form.get('commentDetail')?.removeValidators(Validators.required)
          }
        }
      })
    } else {
      this.form = this.fb.group({
        commentDetail: ['']
      })
    }
  }

  closeModal() {
    this.close.emit(false)
  }

  get modalTitle() {
    if (this.isManager1) {
      return 'Bạn có muốn duyệt hồ sơ này ?'
    } else {
      if (this.form.get('type')?.value === '0') {
        return 'Bạn có muốn từ chối hồ sơ này ?'
      } else {
        return 'Bạn có muốn duyệt hồ sơ này ?'
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

  openModalConfirm() {
    this.isOpenModalConfirm = true
  }

  onSubmit() {
    if (!this.employeeChosen?.id || !this.employeeChosen?.recruitmentUserTaskId) return

    if (this.form.invalid) return

    let action
    if (this.isManager2) {
      action = this.form.value.type === '0' ? 'REJECT' : 'APPROVE'
    }

    this.employeeService
      .changeStatus({
        employeeId: this.employeeChosen?.id,
        action: action as any,
        recruitmentUserTaskId: this.employeeChosen?.recruitmentUserTaskId,
        commentCode: '',
        commentDetail: this.form.value.commentDetail,
        commentTitle: ''
      })
      .pipe(catchError((err) => of(err)))
      .subscribe((res) => {
        if (!(res instanceof HttpErrorResponse) && !(res instanceof Error)) {
          if (this.isManager2) {
            if (this.modalType === 'reject') {
              this.toast.success('Từ chối hồ sơ thành công')
            } else {
              this.toast.success('Duyệt hồ sơ thành công')
            }
          } else {
            this.toast.success('Chuyển duyệt thành công')
          }
          this.isOpenModalConfirm = false
          this.changeStatusDone.emit()
          this.close.emit(false)
        }
      })
  }
}
