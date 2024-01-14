import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { InputComponent } from '../../../shared/components/input/input.component'
import { SelectComponent } from '../../../shared/components/select/select.component'
import { FormManagementService } from '../../../shared/services/form-management.service'
import { family } from '../../../model/employee/family'
import { CONTROL_TYPE } from '../../../shared/constant/control-field-type'
import { ModalComponent } from '../../../shared/components/modal/modal.component'
import { Family } from '../../../model/record'

@Component({
  selector: 'app-modal-add-edit-family-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    ModalAddEditFamilyFormComponent,
    ModalComponent
  ],
  templateUrl: './modal-add-edit-family-form.component.html',
  styleUrl: './modal-add-edit-family-form.component.css',
  providers: [FormManagementService]
})
export class ModalAddEditFamilyFormComponent implements OnInit {
  fieldList!: any
  form = new FormGroup({})
  @Input() mode: 'view' | 'edit' | 'add' = 'add'
  @Input() editedFamilyInfo: Family | null = null
  @Output() onSubmitFamilyInfo = new EventEmitter<Family>()
  @Output() changeMode = new EventEmitter<'add' | 'edit'>()
  @Output() onCloseModal = new EventEmitter<boolean>()

  constructor(private fmService: FormManagementService) {}

  ngOnInit(): void {
    this.fieldList = this.fmService.createFamilyInfoFields()
    this.form = this.fmService.toFormGroup(this.fieldList)

    if (this.mode === 'edit') {
      if (this.editedFamilyInfo) {
        this.form.patchValue(this.editedFamilyInfo, { onlySelf: true })
      }
    } else {
      this.form.reset()
    }
  }

  get modalTitle() {
    switch (this.mode) {
      case 'view':
        return 'Thông tin chi tiết'
      case 'add':
        return 'Thêm mới thông tin gia đình'
      case 'edit':
        return 'Chỉnh sửa thông tin gia đình'
      default:
        return ''
    }
  }

  get controlType() {
    return CONTROL_TYPE
  }

  getFormControl(key: string) {
    return this.form.get(key)
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field)
      control?.markAsDirty({ onlySelf: true })
    })
    if (this.form.invalid) return
    if (this.mode === 'add') {
      this.onSubmitFamilyInfo.emit(this.form.value)
    } else {
      this.onSubmitFamilyInfo.emit({ ...this.form.value, _id: this.editedFamilyInfo?._id })
    }
  }

  closeModal() {
    this.onCloseModal.emit(false)
  }
}
