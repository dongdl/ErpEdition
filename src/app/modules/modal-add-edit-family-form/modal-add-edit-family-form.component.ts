import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormManagementService } from '../../shared/services/form-management.service'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CONTROL_TYPE } from '../../shared/constant/control-field-type'
import { InputComponent } from '../../shared/components/input/input.component'
import { SelectComponent } from '../../shared/components/select/select.component'
import { family } from '../../model/employee/family'
import { ModalComponent } from '../../shared/components/modal/modal.component'

@Component({
  selector: 'app-modal-add-edit-family-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, SelectComponent, ModalComponent],
  templateUrl: './modal-add-edit-family-form.component.html',
  styleUrl: './modal-add-edit-family-form.component.css',
  providers: [FormManagementService]
})
export class ModalAddEditFamilyFormComponent implements OnInit {
  fieldList!: any
  formFamily!: FormGroup
  @Input() mode: 'view' | 'edit' | 'add' = 'add'
  @Input() editedFamilyInfo!: family
  @Output() onSubmitFamilyInfo = new EventEmitter<family>()
  @Output() onCloseModal = new EventEmitter<boolean>()

  constructor(private fmService: FormManagementService) {}
  ngOnInit(): void {
    this.fieldList = this.fmService.createFamilyInfoFields()
    this.formFamily = this.fmService.toFormGroup(this.fieldList)
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
    return this.formFamily.get(key)
  }

  closeModal() {
    this.onCloseModal.emit(false)
  }
}
