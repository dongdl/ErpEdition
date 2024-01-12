import { Component, ContentChild, Input, TemplateRef } from '@angular/core'
import { Employee } from '../../model/record'
import { NgTemplateOutlet } from '@angular/common'

@Component({
  selector: 'app-record-table',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './record-table.component.html',
  styleUrl: './record-table.component.css'
})
export class RecordTableComponent {
  @Input() tableHeader: { key: keyof Employee; name: string; width?: string }[] = []
  @Input() recordList: Employee[] = []
  @ContentChild(TemplateRef, { static: false }) actionTemplate!: TemplateRef<unknown>
}
