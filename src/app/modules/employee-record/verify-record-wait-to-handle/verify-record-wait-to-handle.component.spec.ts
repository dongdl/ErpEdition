import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRecordWaitToHandleComponent } from './verify-record-wait-to-handle.component';

describe('VerifyRecordWaitToHandleComponent', () => {
  let component: VerifyRecordWaitToHandleComponent;
  let fixture: ComponentFixture<VerifyRecordWaitToHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyRecordWaitToHandleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyRecordWaitToHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
