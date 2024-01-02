import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IHrRecord } from '../../model/record';
import { mappingInfo, mappingStatusRecord } from '../../utils/helper';
import { HrRecordsService } from '../hr-records/hr-records.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-preview-record',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './preview-record.component.html',
  styleUrl: './preview-record.component.css',
})
export class PreviewRecordComponent {
  // previewRecordSubscription: Subscription | null = null;
  // constructor(
  //   private hrRecordService: HrRecordsService,
  //   private router: Router
  // ) {}
  // recordPreview: IHrRecord = {
  //   fullName: '',
  //   hrCode: '',
  //   positionCode: '',
  //   level: '',
  //   departmentCode: '',
  //   zone: '',
  //   region: '',
  //   taxCode: '',
  //   bankAccount: '',
  //   status: '',
  //   insuranceNumber: '',
  // };
  // mappingInfoRecord(key: string) {
  //   return mappingInfo[key as keyof IHrRecord];
  // }
  // mappingStatusRecord(key: string) {
  //   return mappingStatusRecord[key as keyof typeof mappingStatusRecord];
  // }
  // get transformInfoRecord() {
  //   if (!this.recordPreview) return [];
  //   return Object.keys(this.recordPreview).map((key) => {
  //     if (key === 'status') {
  //       return {
  //         info: 'status',
  //         value: this.mappingStatusRecord(
  //           this.recordPreview[key as keyof IHrRecord]
  //         ),
  //       };
  //     }
  //     return {
  //       info: key,
  //       value: this.recordPreview[key as keyof IHrRecord],
  //     };
  //   });
  // }
  // ngOnInit(): void {
  //   this.previewRecordSubscription =
  //     this.hrRecordService.previewRecord.subscribe((record) => {
  //       if (record) {
  //         this.recordPreview = record;
  //       }
  //     });
  // }
  // ngOnDestroy(): void {
  //   this.previewRecordSubscription?.unsubscribe();
  // }
  // onSubmitInfo() {
  //   this.router.navigate(['kiem-duyet-thong-tin']);
  // }
  // onEditInfo() {
  //   this.hrRecordService.sendRecord(this.recordPreview);
  //   this.router.navigate(['ho-so-nhan-su']);
  // }
}
