import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IHrRecord } from '../../model/record';
import { mappingInfo } from '../../utils/helper';
import { HrRecordsService } from '../hr-records/hr-records.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-verify-record',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './verify-record.component.html',
  styleUrl: './verify-record.component.css',
})
export class VerifyRecordComponent {
  previewRecordSubscription: Subscription | null = null;

  constructor(private hrRecordService: HrRecordsService) {}
  recordPreview: IHrRecord = {
    fullName: '',
    hrCode: '',
    positionCode: '',
    level: '',
    departmentCode: '',
    zone: '',
    region: '',
    taxCode: '',
    bankAccount: '',
    status: '',
    insuranceNumber: '',
  };

  mappingInfoRecord(key: string) {
    return mappingInfo[key as keyof IHrRecord];
  }

  get transformInfoRecord() {
    if (!this.recordPreview) return [];
    return Object.keys(this.recordPreview).map((key) => {
      return {
        info: key,
        value: this.recordPreview[key as keyof IHrRecord],
      };
    });
  }

  ngOnInit(): void {
    this.previewRecordSubscription =
      this.hrRecordService.previewRecord.subscribe((record) => {
        if (record) {
          this.recordPreview = record;
          this.hrRecordService.sendRecord(null as any);
        }
      });
  }

  ngOnDestroy(): void {
    this.previewRecordSubscription?.unsubscribe();
  }
}
