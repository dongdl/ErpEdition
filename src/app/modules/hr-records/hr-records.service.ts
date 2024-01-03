import { Injectable } from '@angular/core';
import { BehaviorSubject, Observer } from 'rxjs';
import { IHrRecord } from '../../model/record';
import records from './../../utils/users.json';

@Injectable({
  providedIn: 'root',
})
export class HrRecordsService {
  previewRecord: BehaviorSubject<IHrRecord | any> = new BehaviorSubject(null);
  recordList: BehaviorSubject<any> = new BehaviorSubject(records);

  constructor() {}

  sendRecord(record: IHrRecord) {
    this.previewRecord.next(record);
  }

  addRecord(record: IHrRecord) {
    const list = [...this.recordList.value];
    list.unshift(record);
    this.recordList.next(list);
  }

  editRecord(updatedRecord: Partial<IHrRecord>, recordId: number) {
    const list = [...this.recordList.value];
    const updateItem = list.find((item) => item.id === recordId);
    if (!updateItem) return;
    Object.assign(updateItem, updatedRecord);
  }

  deleteRecord(id: number) {
    const list = [...this.recordList.value];
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1) {
      list.splice(index, 1);
      this.recordList.next(list);
    }
  }
}
