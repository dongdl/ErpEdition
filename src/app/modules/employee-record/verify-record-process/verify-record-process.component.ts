import { Component } from '@angular/core'
import { VerifyRecordComponent } from '../verify-record/verify-record.component'
import { FormManagementService } from '../../../shared/services/form-management.service'
import { EMPLOYEE_STATUS } from '../../../model/record'

@Component({
  selector: 'app-verify-record-process',
  standalone: true,
  imports: [VerifyRecordComponent],
  providers: [FormManagementService],
  templateUrl: './verify-record-process.component.html',
  styleUrl: './verify-record-process.component.css'
})
export class VerifyRecordProcessComponent {
  status = EMPLOYEE_STATUS.PROCESSING
}
