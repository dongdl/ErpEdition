import { Component, Input } from '@angular/core'
import { employeeHistory } from '../../model/employee/employeeHistory'
import { NgClass } from '@angular/common'
import { HistoryEmployeeItem } from '../../model/record'

@Component({
  selector: 'app-history-record',
  standalone: true,
  imports: [NgClass],
  templateUrl: './history-record.component.html',
  styleUrl: './history-record.component.css'
})
export class HistoryRecordComponent {
  @Input() history: HistoryEmployeeItem[] = []
  tableHeader: { key: keyof HistoryEmployeeItem; name: string; width?: string | number }[] = [
    {
      name: 'Bước xử lý',
      key: 'taskName',
      width: '40%'
    },
    {
      name: 'Thời gian',
      key: 'createdDate',
      width: '40%'
    },
    {
      name: 'Ghi chú',
      key: 'createdBy',
      width: '30%'
    }
  ]
}
