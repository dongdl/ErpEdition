import { NgClass, NgTemplateOutlet } from '@angular/common'
import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core'
import { Employee } from '../../../model/record'
import { generateStatusStyleAndText } from '../../../utils/helper'
import { FormManagementService } from '../../../shared/services/form-management.service'
import { CommonService } from '../../../shared/services/common.service'
import positionCodeList from '../../../utils/chuc_danh.json'

@Component({
  selector: 'app-record-table',
  standalone: true,
  imports: [NgTemplateOutlet, NgClass],
  templateUrl: './record-table.component.html',
  styleUrl: './record-table.component.css'
})
export class RecordTableComponent implements OnInit {
  @Input() tableHeader: { key: keyof Employee; name: string; width?: string }[] = []
  @Input() recordList: Employee[] = []
  @ContentChild(TemplateRef, { static: false }) actionTemplate!: TemplateRef<unknown>
  departmentCode: any = []

  constructor(private fm: FormManagementService, private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.getListDepartment().subscribe((res) => {
      this.departmentCode = res
    })
  }

  renderNameDepartment(value: any) {
    return this.departmentCode.find((x: any) => x.code.toString() === value.toString())?.name || ''
  }

  renderNamePosition(value: any) {
    return positionCodeList.find((x: any) => x.value.toString() === value.toString())?.title || ''
  }

  createStatusStyleAndText(status: any) {
    if (status) {
      return generateStatusStyleAndText(status)
    }
    return {
      class: '',
      text: ''
    }
  }
}
