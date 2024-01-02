import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHrRecord } from '../../model/record';
import records from './../../utils/users.json';

@Injectable({
  providedIn: 'root',
})
export class HrRecordsService {
  previewRecord: BehaviorSubject<IHrRecord | any> = new BehaviorSubject(null);

  constructor() {}

  sendRecord(record: IHrRecord) {
    this.previewRecord.next(record);
  }
}
