import { Component } from '@angular/core'
import { VerifyRecordComponent } from '../verify-record/verify-record.component'
import { FormManagementService } from '../../../shared/services/form-management.service'
import { EMPLOYEE_STATUS } from '../../../model/record'

@Component({
  selector: 'app-verify-record-wait-to-handle',
  standalone: true,
  imports: [VerifyRecordComponent],
  providers: [FormManagementService],
  templateUrl: './verify-record-wait-to-handle.component.html',
  styleUrl: './verify-record-wait-to-handle.component.css'
})
export class VerifyRecordWaitToHandleComponent {
  status = EMPLOYEE_STATUS.WAIT_PROCESSING
}
