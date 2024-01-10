import { Component } from '@angular/core'
import { employeeHistory } from '../../model/employee/employeeHistory'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-history-record',
  standalone: true,
  imports: [NgClass],
  templateUrl: './history-record.component.html',
  styleUrl: './history-record.component.css'
})
export class HistoryRecordComponent {
  tableHeader: { key: keyof employeeHistory; name: string; width?: string | number }[] = [
    {
      name: 'Nội dung',
      key: 'content',
      width: '40%'
    },
    {
      name: 'Trạng thái',
      key: 'status',
      width: '10%'
    },
    {
      name: 'Trạng thái tiếp theo',
      key: 'nextStatus',
      width: '10%'
    },
    {
      name: 'Mô tả',
      key: 'description',
      width: '40%'
    }
  ]
  tableData: employeeHistory[] = []
}
