import { TestBed } from '@angular/core/testing';

import { HrRecordsService } from './hr-records.service';

describe('HrRecordsService', () => {
  let service: HrRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
