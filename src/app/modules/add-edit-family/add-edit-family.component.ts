import { Component, OnInit } from '@angular/core'
import { family } from '../../model/employee/family'
import { FormManagementService } from '../../shared/services/form-management.service'
import { ModalAddEditFamilyFormComponent } from '../modal-add-edit-family-form/modal-add-edit-family-form.component'

@Component({
  selector: 'app-add-edit-family',
  standalone: true,
  imports: [ModalAddEditFamilyFormComponent],
  providers: [FormManagementService],
  templateUrl: './add-edit-family.component.html',
  styleUrl: './add-edit-family.component.css'
})
export class AddEditFamilyComponent implements OnInit {
  tableHeader!: { key: keyof family; name: string }[]
  familyList: family[] = []
  isOpenModal = false

  ngOnInit(): void {
    this.getTableHeader()
  }

  getTableHeader() {
    const data: { key: keyof family; name: string }[] = [
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

  closeModal() {
    this.isOpenModal = false
  }
}
