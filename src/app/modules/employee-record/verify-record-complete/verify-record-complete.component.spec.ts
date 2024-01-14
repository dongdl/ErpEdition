import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRecordCompleteComponent } from './verify-record-complete.component';

describe('VerifyRecordCompleteComponent', () => {
  let component: VerifyRecordCompleteComponent;
  let fixture: ComponentFixture<VerifyRecordCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyRecordCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyRecordCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
