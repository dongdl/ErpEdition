import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { family } from '../../../model/employee/family'
import { FormManagementService } from '../../../shared/services/form-management.service'
import { ModalAddEditFamilyFormComponent } from '../modal-add-edit-family-form/modal-add-edit-family-form.component'
import { Family } from '../../../model/record'
import { RecordTableComponent } from '../record-table/record-table.component'

@Component({
  selector: 'app-add-edit-family',
  standalone: true,
  imports: [ModalAddEditFamilyFormComponent, RecordTableComponent],
  providers: [FormManagementService],
  templateUrl: './add-edit-family.component.html',
  styleUrl: './add-edit-family.component.css'
})
export class AddEditFamilyComponent implements OnInit {
  tableHeader!: { key: keyof Family; name: string; width?: string }[]
  @Input() familyList: Family[] = []
  @Input() mode: 'add' | 'edit' = 'add'
  @Output() changeFamily = new EventEmitter<Family>()
  @Output() changeMode = new EventEmitter<'add' | 'edit'>()
  @Output() deleteFamily = new EventEmitter<Family>()
  isOpenModal = false
  editedFamily: Family | null = null

  ngOnInit(): void {
    this.getTableHeader()
  }

  getTableHeader() {
    const data: { key: keyof Family; name: string }[] = [
      { key: 'relationShip', name: 'Quan hệ' },
      { key: 'name', name: 'Họ tên' },
      { key: 'birthday', name: 'Ngày sinh' },
      { key: 'gender', name: 'Giới tính' },
      { key: 'job', name: 'Công việc' },
      { key: 'workUnit', name: 'Nơi công tác/làm việc' },
      { key: 'permanentAddress', name: 'Hộ khẩu thường trú' },
      { key: 'currentAddress', name: 'Nơi ở hiện tại' },
      { key: 'cardId', name: 'Số CMT/Thẻ căn cước' },
      { key: 'passportNumber', name: 'Số sổ hộ chiếu' },
      { key: 'passportDate', name: 'Ngày cấp hộ chiếu' },
      { key: 'passportExpiredDate', name: 'Ngày hết hạn hộ chiếu' },
      { key: 'homePhone', name: 'Điện thoại nhà riêng' },
      { key: 'mobilePhone', name: 'Điện thoại di động' },
      { key: 'email', name: 'Email BVB' },
      { key: 'emailPrivate', name: 'Email cá nhân' },
      { key: 'description', name: 'Mô tả' }
    ]

    this.tableHeader = data
  }

  addFamily() {
    this.changeMode.emit('add')
    this.isOpenModal = true
  }

  editFamily(family: Family) {
    this.editedFamily = family
    this.isOpenModal = true
    this.changeMode.emit('edit')
  }

  onSubmit(data: any) {
    this.changeFamily.emit(data)
    this.isOpenModal = false
  }

  delete(record: Family) {
    this.deleteFamily.emit(record)
  }

  closeModal() {
    this.isOpenModal = false
  }
}
