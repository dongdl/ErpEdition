import { Component } from '@angular/core'
import { VerifyRecordComponent } from '../verify-record/verify-record.component'
import { FormManagementService } from '../../../shared/services/form-management.service'
import { EMPLOYEE_STATUS } from '../../../model/record'

@Component({
  selector: 'app-verify-record-complete',
  standalone: true,
  imports: [VerifyRecordComponent],
  providers: [FormManagementService],
  templateUrl: './verify-record-complete.component.html',
  styleUrl: './verify-record-complete.component.css'
})
export class VerifyRecordCompleteComponent {
  status = EMPLOYEE_STATUS.APPROVED
}
